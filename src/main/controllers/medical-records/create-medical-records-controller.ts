import { RequestError } from '@/errors'
import { CreateMedicalRecordsService } from '@/services/medical-records'

import { Request, Response } from 'express'

export class CreateMedicalRecordsController {
  constructor (private readonly service: CreateMedicalRecordsService) {}

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
