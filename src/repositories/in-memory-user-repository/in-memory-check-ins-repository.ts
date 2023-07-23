import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).startOf('date')

    
    const checkInOnSameDate = this.items.find(
      (checkIn) => {

        const checkInDate = dayjs(checkIn.created_at)
        const inOnSameDate = 
          checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
        
        return checkIn.user_id === userId && inOnSameDate
      })

      if(!checkInOnSameDate) {
        return null
      }

      return checkInOnSameDate
  }


  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at): null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
