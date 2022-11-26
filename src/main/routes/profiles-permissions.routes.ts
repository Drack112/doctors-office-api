import { CreateProfilesPermissionsControllerFactory } from '@/main/factories/controllers/profiles-permissions'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createProfilesPermissionsControllerFactory = CreateProfilesPermissionsControllerFactory()

export default (router: Router): void => {
  router.post('/profiles-permissions', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createProfilesPermissionsControllerFactory.handle(req, res))
}
