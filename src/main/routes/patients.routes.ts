import { CreatePatientsControllerFactory, UpdatePatientsControllerFactory, DeletePatientsControllerFactory, GetPatientsControllerFactory, GetPatientsByIdControllerFactory } from '@/main/factories/controllers/patients'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const createPatientsController = CreatePatientsControllerFactory()
const updatePatientsController = UpdatePatientsControllerFactory()
const deletePatientsController = DeletePatientsControllerFactory()
const getPatientsController = GetPatientsControllerFactory()
const getPatientsByIdController = GetPatientsByIdControllerFactory()

export default (router: Router): void => {
  router.use(ensuredAuthenticated(), accessProfilePermission())
  router.get('/patients', async (req, res) => getPatientsController.handle(req, res))
  router.get('/patients/:id', async (req, res) => getPatientsByIdController.handle(req, res))
  router.post('/patients', async (req, res) => createPatientsController.handle(req, res))
  router.patch('/patients/:id', async (req, res) => updatePatientsController.handle(req, res))
  router.delete('/patients/:id', async (req, res) => deletePatientsController.handle(req, res))
}
