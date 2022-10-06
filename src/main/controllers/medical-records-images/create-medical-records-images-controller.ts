import { RequestError } from '@/errors'
import { CreateMedicalRecordsImagesService } from '@/services/medical-records-images'

import { Request, Response } from 'express'

export class CreateMedicalRecordsImagesController {
  constructor (private readonly createMedicalRecordsImagesService: CreateMedicalRecordsImagesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createMedicalRecordsImagesService.execute(req.body)
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
