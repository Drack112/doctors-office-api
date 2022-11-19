import {
  CreateClinicsControllerFactory,
  UpdateClinicsControllerFactory,
  DeleteClinicsControllerFactory,
  GetClinicsControllerFactory,
  GetClinicsByIdControllerFactory,
  GetUsersWithClinicsControllerFactory
} from '@/main/factories/controllers/clinics'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const createClinicsController = CreateClinicsControllerFactory()
const updateClinicsController = UpdateClinicsControllerFactory()
const deleteClinicsController = DeleteClinicsControllerFactory()
const getClinicsController = GetClinicsControllerFactory()
const getClinicsByIdController = GetClinicsByIdControllerFactory()
const getUsersWithClinicsController = GetUsersWithClinicsControllerFactory()

export default (router: Router): void => {
  router.get('/users-clinics', ensuredAuthenticated(), async (req, res) => getUsersWithClinicsController.handle(req, res))
  router.get('/clinics', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getClinicsController.handle(req, res))
  router.get('/clinics/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getClinicsByIdController.handle(req, res))
  router.post('/clinics', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => createClinicsController.handle(req, res))
  router.patch('/clinics/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => updateClinicsController.handle(req, res))
  router.delete('/clinics/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => deleteClinicsController.handle(req, res))
}
