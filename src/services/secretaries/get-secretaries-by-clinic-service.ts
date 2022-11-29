import { UsersClinicsRepository } from '@/infra/repositories'

export class GetSecretariesByClinicService {
  constructor (private readonly usersClinicsRepository: UsersClinicsRepository) {}

  async execute (clinicId: string, url: string): Promise<any> {
    const table = this.getCorrespondingTable(url)
    return await this.usersClinicsRepository.getUsersByClinic(clinicId, table)
  }

  private getCorrespondingTable (url: string): string {
    const [table] = url.split('-')
    return table.replace(/[^a-z]/g, '')
  }
}
