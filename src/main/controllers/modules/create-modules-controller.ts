import { CreateModulesService } from '@/services/modules'

import { Request, Response } from 'express'

export class CreateModulesController {
  constructor (private readonly service: CreateModulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
