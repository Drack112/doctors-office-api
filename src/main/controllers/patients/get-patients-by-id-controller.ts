import { RequestError } from '@/errors'
import { GetPatientsByIdService } from '@/services/patients'

import { Request, Response } from 'express'

export class GetPatientsByIdController {
  constructor (private readonly getPatientsByIdService: GetPatientsByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.getPatientsByIdService.execute(req.params.id)
      res.status(200).json(patient)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
