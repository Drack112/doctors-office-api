import { CreateModulesControllerFactory } from '@/main/factories/controllers/modules'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createModulesControllerFactory = CreateModulesControllerFactory()

export default (router: Router): void => {
  router.post('/modules', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createModulesControllerFactory.handle(req, res))
}
