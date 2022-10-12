import { UserDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserModel } from '@/models'
import { UsersRepository } from '@/infra/repositories'

export class UpdateUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (id: string, params: UserDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(id)
    if (!userExists) throw new RequestError('Usuário não existe.')
    const user = new UserModel({ ...params, created_at: userExists.created_at }, id)
    await this.usersRepository.update(user)
  }
}
