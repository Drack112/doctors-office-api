import { UserDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserModel } from '@/models'
import { UsersRepository } from '@/repositories'

export class CreateUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (params: UserDTO): Promise<void> {
    const { email } = params
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new RequestError('Usuário já existe.')
    const user = new UserModel(params)
    await this.usersRepository.create(user)
  }
}
