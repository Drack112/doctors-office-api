import { RequestError } from '@/errors'
import { GetDoctorsSchedulesByDoctorIdService } from '@/services/doctors-schedules'

import { Request, Response } from 'express'

export class GetDoctorsSchedulesByDoctorIdController {
  constructor (private readonly service: GetDoctorsSchedulesByDoctorIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const { userId: sessionUserId } = req
      const { doctorId } = req.params
      const schedules = await this.service.execute(sessionUserId, doctorId)
      res.status(200).json(schedules)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
