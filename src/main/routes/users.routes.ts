import {
  CreateUsersControllerFactory,
  UpdateUsersControllerFactory,
  DeleteUsersControllerFactory,
  GetUsersControllerFactory,
  GetUsersByIdControllerFactory,
  UpdateUsersPasswordControllerFactory,
  SendPasswordRecoveryTokenControllerFactory,
  ResetUsersPasswordControllerFactory
} from '@/main/factories/controllers/users'
import { ensuredAuthenticated, accessProfilePermission } from '@/middleware'

import { Router } from 'express'

const createUsersControllerFactory = CreateUsersControllerFactory()
const updateUsersControllerFactory = UpdateUsersControllerFactory()
const updateUsersPasswordControllerFactory = UpdateUsersPasswordControllerFactory()
const deleteUsersControllerFactory = DeleteUsersControllerFactory()
const getUsersControllerFactory = GetUsersControllerFactory()
const getUsersByIdControllerFactory = GetUsersByIdControllerFactory()
const sendPasswordRecoveryTokenControllerFactory = SendPasswordRecoveryTokenControllerFactory()
const resetUsersPasswordControllerFactory = ResetUsersPasswordControllerFactory()

export default (router: Router): void => {
  router.post('/send-forgot-password', async (req, res) => sendPasswordRecoveryTokenControllerFactory.handle(req, res))
  router.post('/reset-password', async (req, res) => resetUsersPasswordControllerFactory.handle(req, res))
  router.post('/users', async (req, res) => createUsersControllerFactory.handle(req, res))
  router.patch('/users/update-password', async (req, res) => updateUsersPasswordControllerFactory.handle(req, res))
  router.get('/users', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getUsersControllerFactory.handle(req, res))
  router.get('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getUsersByIdControllerFactory.handle(req, res))
  router.patch('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => updateUsersControllerFactory.handle(req, res))
  router.delete('/users/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => deleteUsersControllerFactory.handle(req, res))
}
