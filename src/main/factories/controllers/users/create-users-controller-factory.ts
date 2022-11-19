import { CreateUsersController } from '@/main/controllers/users'
import { UsersClinicsRepository, UsersRepository } from '@/infra/repositories'
import { UserClinicEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateUsersService } from '@/services/users'
import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'
import { SendMailService } from '@/services/send-mail'

export const CreateUsersControllerFactory = (): CreateUsersController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const userClinicModel = mysqlSource.getRepository(UserClinicEntity)
  const usersRepository = new UsersRepository(userModel)
  const usersClinicsRepository = new UsersClinicsRepository(userClinicModel)
  const mailTemplateProvider = new HandlebarsMailTemplateProvider()
  const mailProvider = new NodemailerProvider(mailTemplateProvider)
  const mailService = new SendMailService(mailProvider)
  const service = new CreateUsersService(usersRepository, usersClinicsRepository, mailService)
  const controller = new CreateUsersController(service)
  return controller
}
