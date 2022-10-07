import { BaseRepository } from './base-repository'
import { ModuleEntity } from '@/infra/entities'

import { In } from 'typeorm'

export class ModulesRepository extends BaseRepository<ModuleEntity> {
  async findModulesByIds (modulesIds: string[]): Promise<ModuleEntity[]> {
    return await this.repository.find({
      where: {
        id: In(modulesIds)
      }
    })
  }
}
