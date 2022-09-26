import { RequestError } from '@/errors'
import { DeleteUsersService } from '@/services/users'

import { Request, Response } from 'express'

export class DeleteUsersController {
  constructor (private readonly deleteUsersService: DeleteUsersService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteUsersService.execute(req.params.id)
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
