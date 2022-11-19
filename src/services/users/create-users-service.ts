import { randomUUID } from 'node:crypto'

import { UserDTO, GenericObject, ProfileTypeEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel, DoctorModel, SecretaryModel, UserModel } from '@/models'
import { BaseRepository, UsersClinicsRepository, UsersRepository } from '@/infra/repositories'
import { AdminEntity, DoctorEntity, SecretaryEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { SendMailService } from '@/services/send-mail'
import { environment } from '@/main/config'

import { hashSync } from 'bcryptjs'

export class CreateUsersService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly usersClinicsRepository: UsersClinicsRepository,
    private readonly mailService: SendMailService
  ) {}

  async execute (params: UserDTO): Promise<void> {
    const { email, userType, clinicsIds } = params
    await this.checkIfUserExists(email)
    const model = this.setRepository(userType)
    const baseRepository = this.setBaseRepository(model)
    const user = this.buildUser(params)
    const specificUser = this.buildSpecificUser(user.id, params)
    await this.usersRepository.create({ ...user, password: hashSync(user.password, environment.encrypt.salt) })
    await baseRepository.create(specificUser)
    await this.associateUserWithClinic(user.id, clinicsIds!)
    await this.sendMail(userType, user)
  }

  private async associateUserWithClinic (userId: string, clinicsIds: string[]): Promise<void> {
    const usersClinics = []
    for (const clinicId of clinicsIds) {
      usersClinics.push({
        id: randomUUID(),
        userId,
        clinicId
      })
    }
    await this.usersClinicsRepository.create(usersClinics)
  }

  private async checkIfUserExists (email: string): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new RequestError('Usuário já existe.')
  }

  private async sendMail (userType: string, data: any): Promise<void> {
    if (userType !== ProfileTypeEnum.admin) {
      await this.mailService.execute('RESET_PASSWORD', data, 'Acesso criado no sistema Huron')
    }
  }

  private generateRandomPassword (): string {
    return randomUUID().replace(/-/g, '')
  }

  private buildUser (params: UserDTO): GenericObject {
    const randomPassword = this.generateRandomPassword()
    const usersObjects = {
      [ProfileTypeEnum.admin]: new UserModel({ ...params, clinicsIds: [] }),
      [ProfileTypeEnum.doctor]: new UserModel({ ...params, password: randomPassword }),
      [ProfileTypeEnum.secretary]: new UserModel({ ...params, password: randomPassword })
    }
    return usersObjects[params.userType as keyof typeof usersObjects]
  }

  private buildSpecificUser (userId: string, params: UserDTO): GenericObject {
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
