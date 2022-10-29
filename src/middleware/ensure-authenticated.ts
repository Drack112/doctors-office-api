import { environment } from '@/main/config'
import { UsersRepository } from '@/infra/repositories'
import { ProfileEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { ProfileTypeEnum } from '@/dtos'

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
        const userIsAdmin = await isUserAdmin(user.id)
        if (userIsAdmin) return next()
        request.modulesIds = user.profile.profilePermissions.map(permissions => permissions.moduleId)
      }
      return next()
    } catch (err) {
      return response.status(401).end()
    }
  }
}

export async function isUserAdmin (userId: string): Promise<boolean> {
  const userModel = mysqlSource.getRepository(UserEntity)
  const usersRepository = new UsersRepository(userModel)
  const user = await usersRepository.findById(userId)
  const profiles = await new ProfileEntity().getProfileInfo()
  const profile = profiles.find(profile => profile.id === user?.profileId)
  return profile?.name === ProfileTypeEnum.admin
}
