import { CreateUsersProfilesService } from '@/services/users-profiles'

import { Request, Response } from 'express'

export class CreateUsersProfilesController {
  constructor (private readonly service: CreateUsersProfilesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
