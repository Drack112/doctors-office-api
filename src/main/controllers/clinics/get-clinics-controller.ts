import { GetClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'

export class GetClinicsController {
  constructor (private readonly service: GetClinicsService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const clinics = await this.service.execute()
      res.status(200).json(clinics)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
