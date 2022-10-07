import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'

export class GetUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (): Promise<UserEntity[]> {
    return await this.usersRepository.get()
  }
}
