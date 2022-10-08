import { BaseRepository } from './base-repository'
import { UserEntity } from '@/infra/entities'

export class UsersRepository extends BaseRepository<UserEntity> {
  async findById (id: string): Promise<UserEntity | null> {
    return await this.repository.findOne({
      where: { id },
      join: {
        alias: 'users',
        innerJoinAndSelect: {
          userProfile: 'users.userProfile',
          profilePermissions: 'userProfile.profilePermissions'
        }
      }
    })
  }

  async findByEmail (email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['userProfile', 'userProfile.profilePermissions']
    })
    return user
  }
}
