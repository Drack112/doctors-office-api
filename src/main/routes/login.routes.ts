import { LoginControllerFactory, RefreshTokenControllerFactory } from '@/main/factories/controllers/auth'
import { ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const loginControllerFactory = LoginControllerFactory()
const refreshTokenControllerFactory = RefreshTokenControllerFactory()

export default (router: Router): void => {
  router.post('/login', async (req, res) => loginControllerFactory.handle(req, res))
  router.get('/refresh-token', ensuredAuthenticated(), async (req, res) => refreshTokenControllerFactory.handle(req, res))
}
