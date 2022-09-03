import { GetPatientsService } from '@/services/patients'

import { Request, Response } from 'express'

export class GetPatientsController {
  constructor (private readonly getPatientsService: GetPatientsService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const patients = await this.getPatientsService.execute()
      res.status(200).json(patients)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
