import { RequestError } from '@/errors'
import { CreateSecretariesService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class CreateSecretariesController {
  constructor (private readonly createSecretariesService: CreateSecretariesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createSecretariesService.execute(req.body)
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
