import { RequestError } from '@/errors'
import { UpdateAdminsService } from '@/services/admins'

import { Request, Response } from 'express'

export class UpdateAdminsController {
  constructor (private readonly updateAdminsService: UpdateAdminsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updateAdminsService.execute(req.params.id, req.body)
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
