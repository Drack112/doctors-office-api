import { randomUUID } from 'node:crypto'

import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { SendMailService } from '@/services/send-mail'

import { RequestError } from '@/errors'
import { UserEntity } from '@/infra/entities'
import { GenericObject, UserTokenDTO } from '@/dtos'
import { UserToken } from '@/models'

import { environment } from '@/main/config'
import { addHours } from 'date-fns'

export class SendPasswordRecoveryTokenService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly usersTokensRepository: UsersTokensRepository,
    private readonly mailService: SendMailService
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new RequestError('Usuário não encontrado.')
    const data = this.generateUserTokenData(user)
    const userToken = new UserToken(data)
    const variables = this.generateLink()
    await this.usersTokensRepository.create(userToken)
    await this.mailService.execute('FORGOT_PASSWORD', variables, 'Esqueci minha senha')
  }

  private generateRefreshToken (): GenericObject {
    const today = new Date()
    const expiresDate = addHours(today, 2)
    const refreshToken = randomUUID()
    return {
      refreshToken,
      expiresDate
    }
  }

  private generateUserTokenData (user: UserEntity): UserTokenDTO {
    const { refreshToken, expiresDate } = this.generateRefreshToken()
    return {
      refreshToken,
      expiresDate,
      userId: user.id
    }
  }

  private generateLink (): string {
    const { refreshToken } = this.generateRefreshToken()
    const link = `${environment.mail.local.forgotMailUrl}/${refreshToken}`
    return link
  }
}
