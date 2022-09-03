import { RequestError } from '@/errors'
import { DeleteSecretariesService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class DeleteSecretariesController {
  constructor (private readonly deleteSecretariesService: DeleteSecretariesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteSecretariesService.execute(req.params.id)
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
