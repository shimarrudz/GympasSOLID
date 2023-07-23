import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-in-repository";
import { GymsRepository } from "../repositories/gyms-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongititude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
    ) {}

  async execute({ 
    userId,
    gymId,
    userLatitude,
    userLongititude,
   }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()

    }

    

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDate){
      throw new Error;
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }

}
