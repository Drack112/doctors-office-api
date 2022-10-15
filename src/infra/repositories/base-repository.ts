import { ObjectLiteral, Repository } from 'typeorm'

export class BaseRepository<Entity extends ObjectLiteral> {
  constructor (public readonly repository: Repository<Entity>) {
    this.repository = repository
  }

  async get (): Promise<Entity[]> {
    return await this.repository.find()
  }

  async create (params: any): Promise<Entity> {
    return await this.repository.save(params)
  }

  async update (params: any): Promise<void> {
    await this.repository.update({ id: params.id }, params)
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById (id: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ id } as any)
  }

  async findByUserId (userId: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ userId } as any)
  }

  async findByEmail (email: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ email } as any)
  }

  async findByCPF (cpf: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ cpf } as any)
  }

  async count (userType: string): Promise<number> {
    return await this.repository.count({ where: { userType } } as any)
  }
}
