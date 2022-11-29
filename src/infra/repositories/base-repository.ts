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

  async getUsersByClinic (clinicId: string, table: string): Promise<any> {
    return await this.repository.query(`
      SELECT 
        * 
      FROM 
        users_clinics uc
          JOIN 
        users u on u.id = uc.user_id
          JOIN 
        clinics c on c.id = uc.clinic_id
          JOIN 
        ${table} t on t.user_id = u.id
      WHERE 
        c.id = '${clinicId}'
    `)
  }
}
