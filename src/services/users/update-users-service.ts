import { UserDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserModel } from '@/models'
import { UsersRepository } from '@/repositories'

export class UpdateUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (id: string, params: UserDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(id)
    if (!userExists) throw new RequestError('Usuário não existe.')
    const user = new UserModel(params)
    const userToUpdate = {
      ...user,
      id: userExists.id,
      created_at: userExists.created_at,
      updated_at: new Date()
    }
    await this.usersRepository.update(userToUpdate)
  }
}
