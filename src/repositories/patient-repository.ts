import { PatientDTO } from '@/dtos'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

import { Repository } from 'typeorm'

export class PatientsRepository {
  private readonly patients: Repository<PatientEntity>

  constructor () {
    this.patients = mysqlSource.getRepository(PatientEntity)
  }

  async create (params: PatientDTO): Promise<void> {
    await this.patients.save(params)
  }

  async update (patient: PatientEntity): Promise<void> {
    await this.patients.update({ id: patient.id }, patient)
  }

  async findById (id: string): Promise<PatientEntity | null> {
    return await this.patients.findOneBy({ id })
  }

  async findByEmail (email: string): Promise<PatientEntity | null> {
    return await this.patients.findOneBy({ email })
  }
}
