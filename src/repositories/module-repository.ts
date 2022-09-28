import { BaseRepository } from '@/repositories'
import { ModuleEntity } from '@/repositories/entities'

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
