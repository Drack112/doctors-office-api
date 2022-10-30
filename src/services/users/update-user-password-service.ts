import { UserDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserModel } from '@/models'
import { UsersRepository } from '@/infra/repositories'

export class UpdateUsersPasswordService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (params: UserDTO): Promise<void> {
    const { email, password } = params
    const userExists = await this.usersRepository.findByEmail(email)
    if (!userExists) throw new RequestError('Usuário não existe.')
    const user = new UserModel({ ...params, createdAt: userExists.createdAt, password }, userExists.id)
    await this.usersRepository.update(user)
  }
}
