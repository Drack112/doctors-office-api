import { randomUUID } from 'node:crypto'

import { UserDTO, GenericObject, ProfileTypeEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel, DoctorModel, SecretaryModel, UserModel } from '@/models'
import { BaseRepository, UsersRepository } from '@/infra/repositories'
import { AdminEntity, DoctorEntity, SecretaryEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { SendMailService } from '@/services/send-mail'

export class CreateUsersService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly mailService: SendMailService
  ) {}

  async execute (params: UserDTO): Promise<void> {
    const { email, userType } = params
    await this.checkIfUserExists(email)
    const model = this.setRepository(userType)
    const baseRepository = this.setBaseRepository(model)
    const { objectToCreate, userToCreate } = await this.createUser(params)
    await baseRepository.create(objectToCreate)
    await this.sendMail(userType, userToCreate)
  }

  private async sendMail (userType: string, data: any): Promise<void> {
    if (userType !== ProfileTypeEnum.admin) {
      await this.mailService.execute('RESET_PASSWORD', data, 'Acesso criado no sistema Huron')
    }
  }

  private async createUser (params: UserDTO): Promise<GenericObject> {
    const userToCreate = this.userWithRandomPassword(params)
    const user = new UserModel(userToCreate)
    const userCreated = await this.usersRepository.create(user)
    const objectToCreate = this.mountObject(userCreated.id, params)
    return { userToCreate, objectToCreate }
  }

  private async checkIfUserExists (email: string): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new RequestError('Usuário já existe.')
  }

  private userWithRandomPassword (params: UserDTO): UserDTO {
    const { userType } = params
    const { doctor, secretary } = ProfileTypeEnum
    let generateUser: UserDTO = params
    if (userType === doctor || userType === secretary) {
      const passwordWithoutHyphen = randomUUID().replace(/-/g, '')
      generateUser = { ...params, password: passwordWithoutHyphen }
    }
    return generateUser
  }

  private mountObject (userId: string, params: UserDTO): GenericObject {
    const { userType, ...data } = params
    const usersObjects = {
      [ProfileTypeEnum.admin]: new AdminModel({ ...data, userId }),
      [ProfileTypeEnum.doctor]: new DoctorModel({ ...data, userId }),
      [ProfileTypeEnum.secretary]: new SecretaryModel({ ...data, userId })
    }
    return usersObjects[userType as keyof typeof usersObjects]
  }

  private setRepository (userType: string): GenericObject {
    const userRoles = {
      [ProfileTypeEnum.admin]: mysqlSource.getRepository(AdminEntity),
      [ProfileTypeEnum.doctor]: mysqlSource.getRepository(DoctorEntity),
      [ProfileTypeEnum.secretary]: mysqlSource.getRepository(SecretaryEntity)
    }
    return userRoles[userType as keyof typeof userRoles]
  }

  private setBaseRepository (entity: any): BaseRepository<typeof entity> {
    const baseRepository = new BaseRepository(entity)
    return baseRepository
  }
}
