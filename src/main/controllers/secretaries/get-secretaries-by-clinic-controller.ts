import { GetSecretariesByClinicService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class GetSecretariesByClinicController {
  constructor (private readonly service: GetSecretariesByClinicService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.service.execute(req.params.clinicId, req.originalUrl)
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
