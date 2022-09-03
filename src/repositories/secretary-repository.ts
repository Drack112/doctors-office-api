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
}
