import { RequestError } from '@/errors'
import { GetAdminsByIdService } from '@/services/admins'

import { Request, Response } from 'express'

export class GetAdminsByIdController {
  constructor (private readonly getAdminsByIdService: GetAdminsByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.getAdminsByIdService.execute(req.params.id)
      res.status(200).json(doctor)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
