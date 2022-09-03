import { RequestError } from '@/errors'
import { UpdateDoctorService } from '@/services/doctors'

import { Request, Response } from 'express'

export class UpdateDoctorController {
  constructor (private readonly updateDoctorService: UpdateDoctorService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updateDoctorService.execute(req.params.id, req.body)
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
