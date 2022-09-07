import { RequestError } from '@/errors'
import { DeleteAdminsService } from '@/services/admins'

import { Request, Response } from 'express'

export class DeleteAdminsController {
  constructor (private readonly deleteAdminsService: DeleteAdminsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteAdminsService.execute(req.params.id)
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
