import { RequestError } from '@/errors'
import { GeneratePatientsPDFService } from '@/services/patients'

import { Request, Response } from 'express'

export class GeneratePatientsPDFController {
  constructor (private readonly service: GeneratePatientsPDFService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const pdf = await this.service.execute()
      res.setHeader('Content-Type', 'application/pdf')
      res.send(pdf)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(404).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
