import { CreateUsersControllerFactory, UpdateUsersControllerFactory, DeleteUsersControllerFactory, GetUsersControllerFactory, GetUsersByIdControllerFactory } from '@/main/factories/controllers/users'

import { Router } from 'express'

const createUsersControllerFactory = CreateUsersControllerFactory()
const updateUsersControllerFactory = UpdateUsersControllerFactory()
const deleteUsersControllerFactory = DeleteUsersControllerFactory()
const getUsersControllerFactory = GetUsersControllerFactory()
const getUsersByIdControllerFactory = GetUsersByIdControllerFactory()

export default (router: Router): void => {
  router.get('/users', async (req, res) => getUsersControllerFactory.handle(req, res))
  router.get('/users/:id', async (req, res) => getUsersByIdControllerFactory.handle(req, res))
  router.post('/users', async (req, res) => createUsersControllerFactory.handle(req, res))
  router.patch('/users/:id', async (req, res) => updateUsersControllerFactory.handle(req, res))
  router.delete('/users/:id', async (req, res) => deleteUsersControllerFactory.handle(req, res))
}
