import { RequestError } from '@/errors'
import { GetClinicsByIdService } from '@/services/clinics'

import { Request, Response } from 'express'

export class GetClinicsByIdController {
  constructor (private readonly getClinicsByIdService: GetClinicsByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const clinic = await this.getClinicsByIdService.execute(req.params.id)
      res.status(200).json(clinic)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
