import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users_clinics')
export class UserClinicEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'clinic_id' })
  clinicId!: string
}
