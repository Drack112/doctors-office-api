import { UsersRepository } from '@/infra/repositories'
import { environment } from '@/main/config'
import { sign } from 'jsonwebtoken'

export class RefreshTokenService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (userId: string): Promise<string> {
    const user = await this.usersRepository.findById(userId)
    const refreshToken = sign({ email: user?.email }, String(environment.jwt.refreshSecretToken), {
      subject: user?.id,
      expiresIn: environment.jwt.refreshTokenExpiresIn
    })
    return refreshToken
  }
}
