import { PrismaCheckInsrepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsrepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
