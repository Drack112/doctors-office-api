import { GetProfilesService } from '@/services/profiles'

import { Request, Response } from 'express'

export class GetProfilesController {
  constructor (private readonly service: GetProfilesService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const profiles = await this.service.execute()
      res.status(200).json(profiles)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
