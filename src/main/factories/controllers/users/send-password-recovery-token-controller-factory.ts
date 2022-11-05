import { SendPasswordRecoveryTokenController } from '@/main/controllers/users'
import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { SendPasswordRecoveryTokenService } from '@/services/users'
import { UserEntity, UserTokenEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { SendMailService } from '@/services/send-mail'
import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'
import { DateFNSProviderFactory } from '@/main/factories/infra/date/date-fns-factory'

export const SendPasswordRecoveryTokenControllerFactory = (): SendPasswordRecoveryTokenController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const usersRepository = new UsersRepository(userModel)
  const userTokenModel = mysqlSource.getRepository(UserTokenEntity)
  const usersTokensRepository = new UsersTokensRepository(userTokenModel)
  const mailTemplateProvider = new HandlebarsMailTemplateProvider()
  const mailProvider = new NodemailerProvider(mailTemplateProvider)
  const mailService = new SendMailService(mailProvider)
  const service = new SendPasswordRecoveryTokenService(
    usersRepository,
    usersTokensRepository,
    mailService,
    DateFNSProviderFactory()
  )
  const controller = new SendPasswordRecoveryTokenController(service)
  return controller
}
