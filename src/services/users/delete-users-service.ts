import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'

export class DeleteUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (id: string): Promise<void> {
    const usersExists = await this.usersRepository.findById(id)
    if (!usersExists) throw new RequestError('Usuário não existe.')
    await this.usersRepository.delete(id)
  }
}
