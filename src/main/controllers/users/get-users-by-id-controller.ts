import { RequestError } from '@/errors'
import { GetUsersByIdService } from '@/services/users'

import { Request, Response } from 'express'

export class GetUsersByIdController {
  constructor (private readonly service: GetUsersByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const admin = await this.service.execute(req.params.id)
      res.status(200).json(admin)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
