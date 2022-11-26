import { DashboardControllerFactory } from '@/main/factories/controllers/dashboard'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const dashboardControllerFactory = DashboardControllerFactory()

export default (router: Router): void => {
  router.get('/dashboard', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => dashboardControllerFactory.handle(req, res))
}
