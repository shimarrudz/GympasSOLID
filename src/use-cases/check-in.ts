import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-in-repository";
import { GymsRepository } from "../repositories/gyms-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between0coordinates";
import { MaxNumbersOfCheckIns } from "./errors/max-number-of-check-ins-error";
import { MaxDistance } from "./errors/max-distance-error";

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

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongititude},
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = .01

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistance
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDay){
      throw new MaxNumbersOfCheckIns;
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
