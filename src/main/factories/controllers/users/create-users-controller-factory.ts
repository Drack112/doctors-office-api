import { CreateUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateUsersService } from '@/services/users'
import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'
import { SendMailService } from '@/services/send-mail'

export const CreateUsersControllerFactory = (): CreateUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const mailTemplateProvider = new HandlebarsMailTemplateProvider()
  const mailProvider = new NodemailerProvider(mailTemplateProvider)
  const mailService = new SendMailService(mailProvider)
  const service = new CreateUsersService(repository, mailService)
  const controller = new CreateUsersController(service)
  return controller
}
