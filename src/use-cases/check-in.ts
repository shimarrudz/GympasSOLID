import { UsersRepository } from "../repositories/users-repository";
import { CheckIn, User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface CheckInUseCaseUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCaseUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: CheckInUseCaseUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
    const user = await this.usersRepository.findById(userId)

    if (!user) {
        throw new ResourceNotFound
    }

    return {
        user,
    }

  }

}
