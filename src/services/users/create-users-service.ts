import { randomUUID } from 'node:crypto'

import { UserDTO, GenericObject, UserTypeEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel, DoctorModel, SecretaryModel, UserModel } from '@/models'
import { BaseRepository, UsersRepository } from '@/infra/repositories'
import { AdminEntity, DoctorEntity, SecretaryEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export class CreateUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (params: UserDTO): Promise<void> {
    const { email, userType } = params
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new RequestError('Usuário já existe.')
    const model = this.setRepository(userType)
    const baseRepository = this.setBaseRepository(model)
    const userToCreate = this.userWithRandomPassword(params)
    const user = await this.usersRepository.create(userToCreate)
    const objectToCreate = this.mountObject(user.id, params)
    await baseRepository.create(objectToCreate)
  }

  private userWithRandomPassword (params: UserDTO): UserModel {
    const { userType } = params
    const { doctor, secretary } = UserTypeEnum
    let generateUser: UserDTO
    if (userType === doctor || userType === secretary) {
      const passwordWithoutHyphen = randomUUID().replace(/-/g, '')
      generateUser = { ...params, password: passwordWithoutHyphen }
    } else {
      generateUser = params
    }
    return new UserModel(generateUser ?? params)
  }

  private mountObject (userId: string, params: UserDTO): GenericObject {
    const { userType } = params
    const usersObjects = {
      admin: new AdminModel({ ...params, userId }),
      doctor: new DoctorModel({ ...params, userId }),
      secretary: new SecretaryModel({ ...params, userId })
    }
    return usersObjects[userType as keyof typeof usersObjects]
  }

  private setRepository (userType: string): GenericObject {
    const userRoles = {
      admin: mysqlSource.getRepository(AdminEntity),
      doctor: mysqlSource.getRepository(DoctorEntity),
      secretary: mysqlSource.getRepository(SecretaryEntity)
    }
    return userRoles[userType as keyof typeof userRoles]
  }

  private setBaseRepository (entity: any): BaseRepository<typeof entity> {
    const baseRepository = new BaseRepository(entity)
    return baseRepository
  }
}
