import { compare, hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ChangePasswordUseCase } from './change-password'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRepository: InMemoryUsersRepository
let sut: ChangePasswordUseCase

describe('Change Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ChangePasswordUseCase(usersRepository)
  })

  it('should be able to change user password', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      userId: createdUser.id,
      password: '123456',
      newPassword: '12345678',
    })

    expect(await compare('12345678', createdUser.password_hash)).toBeTruthy()
  })

  it('should not be able to change user password with wrong email', async () => {
    await expect(() =>
      sut.execute({
        userId: 'inexistent-user-id',
        password: '123456',
        newPassword: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to change user password with wrong email', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        password: 'invalid-password',
        newPassword: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
