import { RequestError } from '@/errors'
import { CreateClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'

export class CreateClinicsController {
  constructor (private readonly service: CreateClinicsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
