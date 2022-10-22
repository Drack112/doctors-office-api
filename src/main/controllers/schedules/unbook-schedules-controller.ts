import { RequestError } from '@/errors'
import { UnbookSchedulesService } from '@/services/schedules'

import { Request, Response } from 'express'

export class UnbookSchedulesController {
  constructor (private readonly service: UnbookSchedulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.params.scheduleId)
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
