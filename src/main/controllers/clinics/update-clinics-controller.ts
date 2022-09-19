import { RequestError } from '@/errors'
import { UpdateClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'

export class UpdateClinicsController {
  constructor (private readonly updateClinicsService: UpdateClinicsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updateClinicsService.execute(req.params.id, req.body)
      res.sendStatus(200)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(404).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
