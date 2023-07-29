import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ChangePasswordUseCase } from '../change-password'

export function makeChangePasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new ChangePasswordUseCase(usersRepository)

  return useCase
}
