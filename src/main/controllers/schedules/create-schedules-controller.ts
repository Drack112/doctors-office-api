import { RequestError } from '@/errors'
import { CreateSchedulesService } from '@/services/schedules'

import { Request, Response } from 'express'

export class CreateSchedulesController {
  constructor (private readonly createSchedulesService: CreateSchedulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createSchedulesService.execute(req.body, req.userId)
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
