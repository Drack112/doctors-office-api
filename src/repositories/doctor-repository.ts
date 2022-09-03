import { DoctorDTO } from '@/dtos'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

import { Repository } from 'typeorm'

export class DoctorsRepository {
  private readonly doctors: Repository<DoctorEntity>

  constructor () {
    this.doctors = mysqlSource.getRepository(DoctorEntity)
  }

  async create (params: DoctorDTO): Promise<void> {
    await this.doctors.save(params)
  }

  async update (doctor: DoctorEntity): Promise<void> {
    await this.doctors.update({ id: doctor.id }, doctor)
  }

  async delete (id: string): Promise<void> {
    await this.doctors.delete(id)
  }

  async findById (id: string): Promise<DoctorEntity | null> {
    return await this.doctors.findOneBy({ id })
  }

  async findByEmail (email: string): Promise<DoctorEntity | null> {
    return await this.doctors.findOneBy({ email })
  }

  async findByCRM (crm: string): Promise<DoctorEntity | null> {
    return await this.doctors.findOneBy({ crm })
  }

  async findByCPF (cpf: string): Promise<DoctorEntity | null> {
    return await this.doctors.findOneBy({ cpf })
  }
}
