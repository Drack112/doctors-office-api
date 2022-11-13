import { RequestError } from '@/errors'
import { RefreshTokenService } from '@/services/auth'

import { Request, Response } from 'express'

export class RefreshTokenController {
  constructor (private readonly service: RefreshTokenService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = await this.service.execute(req.userId)
      res.status(200).json({ refresh_token: refreshToken })
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
