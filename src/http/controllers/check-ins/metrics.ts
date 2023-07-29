import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricUseCase } from '@/use-cases/factories/get-user-metric-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
