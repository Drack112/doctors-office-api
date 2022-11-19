import { GetUsersWithClinicsService } from '@/services/users'

import { Request, Response } from 'express'

export class GetUsersWithClinicsController {
  constructor (private readonly service: GetUsersWithClinicsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const usersWithClinics = await this.service.execute(req.userId)
      res.status(200).json(usersWithClinics)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
