import { BaseRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'

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
    // const user = await this.repository.findOneBy({
    //   email
    //   join: {
    //     alias: 'users',
    //     innerJoinAndSelect: {
    //       userProfile: 'users.userProfile',
    //       profilePermissions: 'userProfile.profilePermissions'
    //     }
    //   }
    // })
    const user = await this.repository.findOne({
      where: { email },
      relations: ['userProfile', 'userProfile.profilePermissions']
      // join: {
      //   alias: 'users',
      //   innerJoinAndSelect: {
      //     userProfile: 'users.userProfile',
      //     profilePermissions: 'userProfile.profilePermissions'
      //   }
      // }
    })
    console.log('find user', user)
    return user
  }
}
