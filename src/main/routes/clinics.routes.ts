import {
  CreateClinicsControllerFactory,
  UpdateClinicsControllerFactory,
  DeleteClinicsControllerFactory,
  GetClinicsControllerFactory,
  GetClinicsByIdControllerFactory,
  GetUsersWithClinicsControllerFactory
} from '@/main/factories/controllers/clinics'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createClinicsController = CreateClinicsControllerFactory()
const updateClinicsController = UpdateClinicsControllerFactory()
const deleteClinicsController = DeleteClinicsControllerFactory()
const getClinicsController = GetClinicsControllerFactory()
const getClinicsByIdController = GetClinicsByIdControllerFactory()
const getUsersWithClinicsController = GetUsersWithClinicsControllerFactory()

export default (router: Router): void => {
  router.post('/set-clinic', ensuredAuthenticated(), clinicMiddleware(), (req, res) => {
    res.status(200).json({ clinicId: req.body.clinicId })
  })
  router.get('/users-clinics', ensuredAuthenticated(), clinicMiddleware(), async (req, res) => getUsersWithClinicsController.handle(req, res))
  router.get('/clinics', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getClinicsController.handle(req, res))
  router.get('/clinics/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getClinicsByIdController.handle(req, res))
  router.post('/clinics', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createClinicsController.handle(req, res))
  router.patch('/clinics/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => updateClinicsController.handle(req, res))
  router.delete('/clinics/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => deleteClinicsController.handle(req, res))
}
