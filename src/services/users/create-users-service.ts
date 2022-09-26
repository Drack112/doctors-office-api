import { UserDTO, GenericObject } from '@/dtos'
import { RequestError } from '@/errors'
import { AdminModel, DoctorModel, SecretaryModel, UserModel } from '@/models'
import { BaseRepository, UsersRepository } from '@/repositories'
import { AdminEntity, DoctorEntity, SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export class CreateUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (params: UserDTO): Promise<void> {
    const { email, userType } = params
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new RequestError('Usuário já existe.')
    const model = this.setRepository(userType)
    const baseRepository = this.setBaseRepository(model)
    const userToCreate = new UserModel(params)
    const user = await this.usersRepository.create(userToCreate)
    const objectToCreate = this.mountObject(user.id, params)
    await baseRepository.create(objectToCreate)
  }

  private mountObject (userId: string, params: UserDTO): GenericObject {
    const { userType } = params
    const usersObjects = {
      admin: this.generateAdminObject(userId, params),
      doctor: this.generateDoctorObject(userId, params),
      secretary: this.generateSecretaryObject(userId, params)
    }
    return usersObjects[userType as keyof typeof usersObjects]
  }

  private generateAdminObject (userId: string, params: UserDTO): AdminModel {
    const admin = new AdminModel({ ...params, userId })
    return admin
  }

  private generateDoctorObject (userId: string, params: UserDTO): DoctorModel {
    const doctor = new DoctorModel({ ...params, userId })
    return doctor
  }

  private generateSecretaryObject (userId: string, params: UserDTO): SecretaryModel {
    const secretary = new SecretaryModel({ ...params, userId })
    return secretary
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
