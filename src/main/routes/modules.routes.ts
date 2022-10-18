import { CreateModulesControllerFactory } from '@/main/factories/controllers/modules'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const createModulesControllerFactory = CreateModulesControllerFactory()

export default (router: Router): void => {
  router.post('/modules', ensuredAuthenticated(), ensuredAuthenticated(), async (req, res) => createModulesControllerFactory.handle(req, res))
  router.put('/modules/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => createModulesControllerFactory.handle(req, res))
}
