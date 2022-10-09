import { CreateProfilesService } from '@/services/profiles'

import { Request, Response } from 'express'

export class CreateProfilesController {
  constructor (private readonly createProfilesService: CreateProfilesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.createProfilesService.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
