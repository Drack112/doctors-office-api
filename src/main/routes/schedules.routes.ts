import { BookSchedulesControllerFactory, UnbookSchedulesControllerFactory } from '@/main/factories/controllers/schedules'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const bookSchedulesControllerFactory = BookSchedulesControllerFactory()
const unbookSchedulesControllerFactory = UnbookSchedulesControllerFactory()

export default (router: Router): void => {
  router.post('/schedules', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => bookSchedulesControllerFactory.handle(req, res))
  router.patch('/schedules/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => unbookSchedulesControllerFactory.handle(req, res))
}
