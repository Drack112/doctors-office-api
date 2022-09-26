import { UsersRepository } from '@/repositories'
import { LoginDTO, LoginResponseDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserEntity } from '@/repositories/entities'
import { environment } from '@/main/config'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class LoginService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (params: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = params
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new RequestError('Usuário/senha inválido.')
    return await this.checkPassword(password, user)
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
