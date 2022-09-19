import { GetClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'

export class GetClinicsController {
  constructor (private readonly getClinicsService: GetClinicsService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.getClinicsService.execute()
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
