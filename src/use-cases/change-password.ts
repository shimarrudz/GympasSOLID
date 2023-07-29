import { compare, hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'

interface ChangePasswordUseCaseRequest {
  userId: string
  password: string
  newPassword: string
}

export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    password,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    user.password_hash = await hash(newPassword, 6)

    await this.usersRepository.save(user)
  }
}
