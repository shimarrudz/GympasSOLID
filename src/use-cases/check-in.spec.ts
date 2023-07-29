import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumbersOfCheckIns } from './errors/max-number-of-check-ins-error'
import { MaxDistance } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(async() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
        id: 'gym-01',
        title: 'JavaScript Gym',
        phone: '',
        description: '',
        latitude: new Decimal(-23.6514718),
        longitude: new Decimal(-46.5275789)
    })

    vi.useFakeTimers()
})

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.6514718,
            userLongititude: -46.5275789
        })
    
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.6514718,
            userLongititude: -46.5275789
        })
        
        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.6514718,
            userLongititude: -46.5275789
        })).rejects.toBeInstanceOf(MaxNumbersOfCheckIns)
    })

    it('should be able to check in twice but in different day', async () => {
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.6514718,
            userLongititude: -46.5275789
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            phone: '',
            description: '',
            latitude: new Decimal(-23.6514718),
            longitude: new Decimal(-46.5275789)
        })
       
        await expect(()=> sut.execute({
            gymId: 'gym-02',
            userId: 'user-02',
            userLatitude: -23.6488474,
            userLongititude: -46.5263714
        }),
        ).rejects.toBeInstanceOf(MaxDistance)
    })
});
