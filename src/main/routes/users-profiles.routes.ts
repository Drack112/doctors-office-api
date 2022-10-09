import { CreateUsersProfilesControllerFactory } from '@/main/factories/controllers/users-profiles'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const createUsersProfilesControllerFactory = CreateUsersProfilesControllerFactory()

export default (router: Router): void => {
  router.post('/users-profiles', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => createUsersProfilesControllerFactory.handle(req, res))
}
