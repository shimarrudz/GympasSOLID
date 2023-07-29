import { Prisma, Role, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: Role.MEMBER,
    }

    this.items.push(user)

    return user
  }

  async save(user: User): Promise<User> {
    const index = this.items.findIndex((item) => item.id === user.id)

    if (index === -1) {
      throw new Error('User not found.')
    }

    this.items[index] = user

    return this.items[index]
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    return !user ? null : user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    return !user ? null : user
  }
}
