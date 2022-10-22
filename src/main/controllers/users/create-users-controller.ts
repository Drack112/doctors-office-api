import { RequestError } from '@/errors'
import { CreateUsersService } from '@/services/users'

import { Request, Response } from 'express'

export class CreateUsersController {
  constructor (private readonly service: CreateUsersService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
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
