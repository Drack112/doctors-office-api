import { RequestError } from '@/errors'
import { UpdateSecretariesService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class UpdateSecretariesController {
  constructor (private readonly updateSecretariesService: UpdateSecretariesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updateSecretariesService.execute(req.params.id, req.body)
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
