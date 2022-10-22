import { CreateProfilesPermissionsService } from '@/services/profiles-permissions'

import { Request, Response } from 'express'

export class CreateProfilesPermissionsController {
  constructor (private readonly service: CreateProfilesPermissionsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
