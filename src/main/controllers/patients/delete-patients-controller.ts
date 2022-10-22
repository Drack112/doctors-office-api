import { RequestError } from '@/errors'
import { DeletePatientsService } from '@/services/patients'

import { Request, Response } from 'express'

export class DeletePatientsController {
  constructor (private readonly service: DeletePatientsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.params.id)
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
