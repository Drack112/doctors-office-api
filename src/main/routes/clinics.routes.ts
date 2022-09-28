import { CreateClinicsControllerFactory, UpdateClinicsControllerFactory, DeleteClinicsControllerFactory, GetClinicsControllerFactory, GetClinicsByIdControllerFactory } from '@/main/factories/controllers/clinics'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'
import { randomUUID } from 'crypto'

import { Router } from 'express'

const createClinicsController = CreateClinicsControllerFactory()
const updateClinicsController = UpdateClinicsControllerFactory()
const deleteClinicsController = DeleteClinicsControllerFactory()
const getClinicsController = GetClinicsControllerFactory()
const getClinicsByIdController = GetClinicsByIdControllerFactory()

export default (router: Router): void => {
  router.get('/uuid', async (req, res) => {
    const uuid = randomUUID()
    res.json(uuid).end()
  })

  router.get('/clinics', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getClinicsController.handle(req, res))
  router.get('/clinics/:id', async (req, res) => getClinicsByIdController.handle(req, res))
  router.post('/clinics', async (req, res) => createClinicsController.handle(req, res))
  router.patch('/clinics/:id', async (req, res) => updateClinicsController.handle(req, res))
  router.delete('/clinics/:id', async (req, res) => deleteClinicsController.handle(req, res))
}
