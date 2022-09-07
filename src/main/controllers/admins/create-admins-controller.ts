import { RequestError } from '@/errors'
import { CreateAdminsService } from '@/services/admins'

import { Request, Response } from 'express'

export class CreateAdminsController {
  constructor (private readonly createAdminsService: CreateAdminsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createAdminsService.execute(req.body)
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
