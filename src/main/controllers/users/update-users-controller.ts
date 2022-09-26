import { RequestError } from '@/errors'
import { UpdateUsersService } from '@/services/users'

import { Request, Response } from 'express'

export class UpdateUsersController {
  constructor (private readonly updateUsersService: UpdateUsersService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updateUsersService.execute(req.params.id, req.body)
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
