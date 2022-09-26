import { UsersRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'

export class GetUsersService {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (): Promise<UserEntity[]> {
    return await this.usersRepository.get()
  }
}
