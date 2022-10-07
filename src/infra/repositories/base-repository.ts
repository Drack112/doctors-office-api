import { ObjectLiteral, Repository } from 'typeorm'

export class BaseRepository<T extends ObjectLiteral> {
  constructor (public readonly repository: Repository<T>) {
    this.repository = repository
  }

  async get (): Promise<T[]> {
    return await this.repository.find()
  }

  async create (params: any): Promise<T> {
    return await this.repository.save(params)
  }

  async update (params: any): Promise<void> {
    await this.repository.update({ id: params.id }, params)
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById (id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any)
  }

  async findByUserId (userId: string): Promise<T | null> {
    return await this.repository.findOneBy({ userId } as any)
  }

  async findByEmail (email: string): Promise<T | null> {
    return await this.repository.findOneBy({ email } as any)
  }

  async findByCPF (cpf: string): Promise<T | null> {
    return await this.repository.findOneBy({ cpf } as any)
  }
}
