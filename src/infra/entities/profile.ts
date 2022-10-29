import { BaseModel } from './base-model'
import { ProfilePermissionEntity } from './profile-permission'
import { mysqlSource } from '../mysql-connection'
import { ProfilesRepository } from '../repositories'

import { Column, Entity, OneToMany } from 'typeorm'

@Entity('profiles')
export class ProfileEntity extends BaseModel {
  @Column()
  name!: string

  @OneToMany(() => ProfilePermissionEntity, (profilePermissions) => profilePermissions.profile)
  profilePermissions!: ProfilePermissionEntity[]

  public async getProfileInfo (): Promise<ProfileEntity[]> {
    const profileModel = mysqlSource.getRepository(ProfileEntity)
    const profilesRepository = new ProfilesRepository(profileModel)
    const profiles = await profilesRepository.get()
    return profiles
  }
}
