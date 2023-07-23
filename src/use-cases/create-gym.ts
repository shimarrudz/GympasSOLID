import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { User } from '@prisma/client'

export interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
}

export interface CreateGymUseCaseResponse {
  user: User
}

export class CreateGymUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ title, description, phone }: CreateGymUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)    

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError
    }

    const user = await this.usersRepository.create({
        title,
        description,
        phone,
    })

    return {
      user,
    }
  }
}
