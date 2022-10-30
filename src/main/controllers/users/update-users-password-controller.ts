import { RequestError } from '@/errors'
import { UpdateUsersPasswordService } from '@/services/users'

import { Request, Response } from 'express'

export class UpdateUsersPasswordController {
  constructor (private readonly service: UpdateUsersPasswordService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
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
