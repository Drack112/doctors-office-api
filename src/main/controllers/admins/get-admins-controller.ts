import { GetAdminsService } from '@/services/admins'

import { Request, Response } from 'express'

export class GetAdminsController {
  constructor (private readonly getAdminsService: GetAdminsService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.getAdminsService.execute()
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
