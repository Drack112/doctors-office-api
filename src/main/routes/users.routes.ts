import { CreateUsersControllerFactory, UpdateUsersControllerFactory, DeleteUsersControllerFactory, GetUsersControllerFactory, GetUsersByIdControllerFactory } from '@/main/factories/controllers/users'
import { ensuredAuthenticated, accessProfilePermission } from '@/middleware'

import { Router } from 'express'

const createUsersControllerFactory = CreateUsersControllerFactory()
const updateUsersControllerFactory = UpdateUsersControllerFactory()
const deleteUsersControllerFactory = DeleteUsersControllerFactory()
const getUsersControllerFactory = GetUsersControllerFactory()
const getUsersByIdControllerFactory = GetUsersByIdControllerFactory()

export default (router: Router): void => {
  router.post('/users', async (req, res) => createUsersControllerFactory.handle(req, res))
  router.get('/users', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getUsersControllerFactory.handle(req, res))
  router.get('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getUsersByIdControllerFactory.handle(req, res))
  router.patch('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => updateUsersControllerFactory.handle(req, res))
  router.delete('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => deleteUsersControllerFactory.handle(req, res))
}
