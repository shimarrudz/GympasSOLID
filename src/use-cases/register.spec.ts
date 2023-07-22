import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory-user-repository/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should be able hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswrdCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswrdCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same e-mail twice', async () => {
        const email = 'johndoe@example.com'
    
        await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(() =>
        sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})