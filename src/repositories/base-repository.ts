import { DoctorScheduleDTO } from '@/dtos'
import { ObjectLiteral, Repository } from 'typeorm'

export class BaseRepository<Entity extends ObjectLiteral> {
  constructor (protected readonly repository: Repository<Entity>) {}

  async get (): Promise<Entity[]> {
    return await this.repository.find()
  }

  async create (params: any): Promise<void> {
    await this.repository.save(params)
  }

  async update (params: Entity): Promise<void> {
    await this.repository.save(params)
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById (id: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ id } as any)
  }

  async findByEmail (email: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ email } as any)
  }

  async findByCPF (cpf: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ cpf } as any)
  }

  async findByCRM (crm: string): Promise<Entity | null> {
    return await this.repository.findOneBy({ crm } as any)
  }

  async findExistantSchedules (params: DoctorScheduleDTO): Promise<boolean> {
    const { doctor_id, schedules } = params
    const foundSchedules = await this.repository.find({ where: { doctor_id } } as any)
    let hasScheduled: boolean = false
    if (foundSchedules?.length) {
      for (const schedule of schedules) {
        hasScheduled = foundSchedules.some(found => found.date === schedule.date && found.time === schedule.time)
      }
    }
    return hasScheduled
  }
}
