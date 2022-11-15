import { RequestError } from '@/errors'
import { BookSchedulesService } from '@/services/schedules'

import { Request, Response } from 'express'

export class BookSchedulesController {
  constructor (private readonly service: BookSchedulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body, req.userId)
      res.sendStatus(201)
    } catch (error) {
      console.log('ERROR', error)
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
