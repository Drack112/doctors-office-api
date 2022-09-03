import { RequestError } from '@/errors'
import { UpdatePatientsService } from '@/services/patients'

import { Request, Response } from 'express'

export class UpdatePatientsController {
  constructor (private readonly updatePatientsService: UpdatePatientsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.updatePatientsService.execute(req.params.id, req.body)
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
