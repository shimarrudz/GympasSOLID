import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Change Password (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to change user password', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .patch('/change/password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: '123456',
        newPassword: '12345678',
      })

    expect(response.statusCode).toEqual(200)
  })
})
