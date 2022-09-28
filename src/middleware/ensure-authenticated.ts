import { environment } from '@/main/config'
import { UsersRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

type Payload = { sub: string }

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization
    if (!authHeaders) return response.status(401).json({ error: 'Token is missing' })
    const [, token] = authHeaders.split(' ')
    try {
      const { sub: user_id } = verify(token, environment.jwt.secret) as Payload
      const userId = user_id.toString()
      const model = mysqlSource.getRepository(UserEntity)
      const userRepository = new UsersRepository(model)
      const user = await userRepository.findById(userId)
      if (user) {
        request.userId = userId
        request.modulesIds = user.userProfile.profilePermissions.map(permissions => permissions.moduleId)
      }
      return next()
    } catch (err) {
      return response.status(401).end()
    }
  }
}
