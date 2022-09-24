import { RequestError } from '@/errors'
import { DeleteDoctorsSchedulesService } from '@/services/doctors-schedules'

import { Request, Response } from 'express'

export class DeleteDoctorsSchedulesController {
  constructor (private readonly deleteDoctorsSchedulesService: DeleteDoctorsSchedulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteDoctorsSchedulesService.execute(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
