import { RequestError } from '@/errors'
import { GetSecretariesByIdService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class GetSecretariesByIdController {
  constructor (private readonly getSecretariesByIdService: GetSecretariesByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const secretary = await this.getSecretariesByIdService.execute(req.params.id)
      res.status(200).json(secretary)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
