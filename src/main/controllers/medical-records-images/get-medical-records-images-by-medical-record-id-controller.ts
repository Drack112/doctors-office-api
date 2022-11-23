import { RequestError } from '@/errors'
import { GetMedicalRecordsImagesByMedicalRecordIdService } from '@/services/medical-records-images'

import { Request, Response } from 'express'

export class GetMedicalRecordsImagesByMedicalRecordIdController {
  constructor (private readonly service: GetMedicalRecordsImagesByMedicalRecordIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const images = await this.service.execute(req.params.medicalRecordId)
      res.status(200).json(images)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
