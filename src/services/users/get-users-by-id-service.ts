import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'

export class GetUsersByIdService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (id: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    return user
  }
}
