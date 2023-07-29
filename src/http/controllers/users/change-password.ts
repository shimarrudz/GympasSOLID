import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeChangePasswordUseCase } from '@/use-cases/factories/make-change-password-use-case'

export async function changePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub } = request.user

  const authenticateBodySchema = z.object({
    password: z.string().min(6),
    newPassword: z.string().min(6),
  })

  const { password, newPassword } = authenticateBodySchema.parse(request.body)

  try {
    const changePasswordUseCase = makeChangePasswordUseCase()

    await changePasswordUseCase.execute({ userId: sub, password, newPassword })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
