import { AdminsRepository, UsersRepository } from '@/infra/repositories'
import { LoginDTO, LoginResponseDTO, SituationStatusEnum } from '@/dtos'
import { RequestError } from '@/errors'
import { UserEntity } from '@/infra/entities'
import { environment } from '@/main/config'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class LoginService {
  constructor (
    private readonly usersRepository: UsersRepository,
    private readonly adminsRepository: AdminsRepository
  ) {}

  async execute (params: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = params
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new RequestError('Usuário/senha inválido.')
    await this.checkAdminPermission(user)
    await this.setFirstAccessDate(user)
    return await this.checkPassword(password, user)
  }

  private async checkAdminPermission (user: UserEntity): Promise<void> {
    const { id } = user
    const admin = await this.adminsRepository.findByUserId(id)
    if (admin?.situation === SituationStatusEnum.disabled) {
      throw new RequestError('Acesso bloqueado.')
    }
  }

  private async setFirstAccessDate (user: UserEntity): Promise<void> {
    if (user.firstAccessAt === null) {
      user.firstAccessAt = new Date()
    }
    await this.usersRepository.update(user)
  }

  private async checkPassword (password: string, user: UserEntity): Promise<LoginResponseDTO> {
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) throw new RequestError('Usuário/senha inválido.')
    const access_token = sign({}, String(environment.jwt.secret), {
      subject: user.id,
      expiresIn: environment.jwt.expiresIn
    })
    const userWithoutPassword: Partial<UserEntity> = user
    delete userWithoutPassword.password
    return {
      access_token,
      user: userWithoutPassword
    }
  }
}
