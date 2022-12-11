import { UserEntity } from '../entities/user'
import { ClinicEntity } from '../entities/clinic'

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('users_clinics')
export class UserClinicEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'clinic_id' })
  clinicId!: string

  @ManyToOne(() => ClinicEntity)
  @JoinColumn({
    name: 'clinic_id'
  })
  clinic!: ClinicEntity

  @ManyToOne(() => ClinicEntity)
  @JoinColumn({
    name: 'clinic_id'
  })
  user!: UserEntity
}
