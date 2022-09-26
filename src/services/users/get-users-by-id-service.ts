import { RequestError } from '@/errors'
import { UsersRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'

export class GetUsersByIdService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (id: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    return user
  }
}
