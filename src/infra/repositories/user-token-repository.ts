import { BaseRepository } from './base-repository'
import { UserTokenEntity } from '@/infra/entities'

export class UsersTokensRepository extends BaseRepository<UserTokenEntity> {
  async findByRefreshToken (refreshToken: string): Promise<UserTokenEntity | null> {
    return await this.repository.findOne({
      where: { refreshToken }
    })
  }
}
