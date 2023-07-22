import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateuseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
        throw new InvalidCredentialsError
    }

    const doesPassordMatches = await compare(password, user.password_hash)

    if (!doesPassordMatches) {
        throw new InvalidCredentialsError()
    }

    return {
        user,
    }

  }

}
