import { RequestError } from '@/errors'
import { GetDoctorsByIdService } from '@/services'

import { Request, Response } from 'express'

export class GetDoctorByIdController {
  constructor (private readonly getDoctorByIdService: GetDoctorsByIdService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.getDoctorByIdService.execute(req.params.id)
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
