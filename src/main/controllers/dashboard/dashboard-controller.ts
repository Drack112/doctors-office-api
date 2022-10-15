import { DashboardService } from '@/services/dashboard'

import { Request, Response } from 'express'

export class DashboardController {
  constructor (private readonly dashboardService: DashboardService) {}

  async handle (_: Request, res: Response): Promise<void> {
    try {
      const dashboard = await this.dashboardService.execute()
      res.status(200).json(dashboard)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
