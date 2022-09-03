import { SecretaryDTO } from '@/dtos'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

import { Repository } from 'typeorm'

export class SecretariesRepository {
  private readonly secretaries: Repository<SecretaryEntity>

  constructor () {
    this.secretaries = mysqlSource.getRepository(SecretaryEntity)
  }

  async create (params: SecretaryDTO): Promise<void> {
    await this.secretaries.save(params)
  }

  async update (secretary: SecretaryEntity): Promise<void> {
    await this.secretaries.update({ id: secretary.id }, secretary)
  }

  async findById (id: string): Promise<SecretaryEntity | null> {
    return await this.secretaries.findOneBy({ id })
  }

  async findByEmail (email: string): Promise<SecretaryEntity | null> {
    return await this.secretaries.findOneBy({ email })
  }

  async findByCPF (cpf: string): Promise<SecretaryEntity | null> {
    return await this.secretaries.findOneBy({ cpf })
  }
}
