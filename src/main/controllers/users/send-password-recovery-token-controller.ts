import { RequestError } from '@/errors'
import { SendPasswordRecoveryTokenService } from '@/services/users'

import { Request, Response } from 'express'

export class SendPasswordRecoveryTokenController {
  constructor (private readonly service: SendPasswordRecoveryTokenService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body.email)
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
