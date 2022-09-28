import { LoginControllerFactory } from '@/main/factories/controllers/auth'

import { Router } from 'express'

const loginControllerFactory = LoginControllerFactory()

export default (router: Router): void => {
  router.post('/login', async (req, res) => loginControllerFactory.handle(req, res))
}
