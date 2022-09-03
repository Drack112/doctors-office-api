import { RequestError } from '@/errors'
import { DeleteDoctorService } from '@/services/doctors'

import { Request, Response } from 'express'

export class DeleteDoctorController {
  constructor (private readonly deleteDoctorService: DeleteDoctorService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteDoctorService.execute(req.params.id)
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
