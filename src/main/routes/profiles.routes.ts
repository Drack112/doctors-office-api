import { CreateProfilesControllerFactory } from '@/main/factories/controllers/profiles'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const createProfilesControllerFactory = CreateProfilesControllerFactory()

export default (router: Router): void => {
  router.post('/profiles', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => createProfilesControllerFactory.handle(req, res))
}
