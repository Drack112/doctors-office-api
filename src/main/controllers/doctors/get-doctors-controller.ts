import { GetDoctorsService } from '@/services/doctors'

import { Request, Response } from 'express'

export class GetDoctorsController {
  constructor (private readonly getDoctorsService: GetDoctorsService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.getDoctorsService.execute()
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
