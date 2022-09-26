import { GetUsersService } from '@/services/users'

import { Request, Response } from 'express'

export class GetUsersController {
  constructor (private readonly getUsersService: GetUsersService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersService.execute()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
