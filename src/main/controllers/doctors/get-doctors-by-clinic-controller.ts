import { GetDoctorsByClinicService } from '@/services/doctors'

import { Request, Response } from 'express'

export class GetDoctorsByClinicController {
  constructor (private readonly service: GetDoctorsByClinicService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.service.execute(req.params.clinicId, req.originalUrl)
      res.status(200).json(doctors)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
