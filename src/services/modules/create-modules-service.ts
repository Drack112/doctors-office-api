import { ModuleDTO } from '@/dtos'
import { ModuleModel } from '@/models'
import { ModulesRepository } from '@/infra/repositories'

export class CreateModulesService {
  constructor (private readonly modulesRepository: ModulesRepository) {}

  async execute (params: ModuleDTO): Promise<void> {
    const module = new ModuleModel(params)
    await this.modulesRepository.create(module)
  }
}
