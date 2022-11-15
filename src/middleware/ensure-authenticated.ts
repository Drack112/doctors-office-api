import { environment } from '@/main/config'
import { ClinicsRepository, UsersRepository } from '@/infra/repositories'
import { ClinicEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

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
      const userModel = mysqlSource.getRepository(UserEntity)
      const clinicModel = mysqlSource.getRepository(ClinicEntity)
      const usersRepository = new UsersRepository(userModel)
      const clinicsRepository = new ClinicsRepository(clinicModel)
      const clinic = await clinicsRepository.findByAdminId(userId)
      const user = await usersRepository.findById(userId)
      if (user) {
        request.userId = userId
        request.clinicId = clinic!.id
        request.modulesIds = user.profile.profilePermissions.map(permissions => permissions.moduleId)
      }
      return next()
    } catch (err) {
      return response.status(401).end()
    }
  }
}
