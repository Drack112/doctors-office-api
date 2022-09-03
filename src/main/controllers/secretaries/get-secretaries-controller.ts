import { GetSecretariesService } from '@/services/secretaries'

import { Request, Response } from 'express'

export class GetSecretariesController {
  constructor (private readonly getSecretariesService: GetSecretariesService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const secretaries = await this.getSecretariesService.execute()
      res.status(200).json(secretaries)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
