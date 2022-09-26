import { CreateSchedulesControllerFactory } from '@/main/factories/controllers/schedules'

import { Router } from 'express'

const createSchedulesControllerFactory = CreateSchedulesControllerFactory()

export default (router: Router): void => {
  router.post('/schedules', async (req, res) => createSchedulesControllerFactory.handle(req, res))
}
