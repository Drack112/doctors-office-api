import { RequestError } from '@/errors'
import { CreateDoctorService } from '@/services'

import { Request, Response } from 'express'

export class CreateDoctorController {
  constructor (private readonly createDoctorService: CreateDoctorService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createDoctorService.execute(req.body)
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
