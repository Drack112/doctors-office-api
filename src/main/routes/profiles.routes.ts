import { CreateProfilesControllerFactory, GetProfilesControllerFactory } from '@/main/factories/controllers/profiles'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createProfilesControllerFactory = CreateProfilesControllerFactory()
const getProfilesControllerFactory = GetProfilesControllerFactory()

export default (router: Router): void => {
  router.get('/profiles', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getProfilesControllerFactory.handle(req, res))
  router.post('/profiles', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createProfilesControllerFactory.handle(req, res))
}
