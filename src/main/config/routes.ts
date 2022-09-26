import express, { Router, json } from 'express'
import cors from 'cors'

import { CreatePatientsControllerFactory, UpdatePatientsControllerFactory, DeletePatientsControllerFactory, GetPatientsControllerFactory, GetPatientsByIdControllerFactory } from '@/main/factories/controllers/patients'
import { CreateClinicsControllerFactory, UpdateClinicsControllerFactory, DeleteClinicsControllerFactory, GetClinicsControllerFactory, GetClinicsByIdControllerFactory } from '@/main/factories/controllers/clinics'
import { CreateDoctorsSchedulesControllerFactory, DeleteDoctorsSchedulesControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { CreateSchedulesControllerFactory } from '@/main/factories/controllers/schedules'
import { CreateUsersControllerFactory, UpdateUsersControllerFactory, DeleteUsersControllerFactory, GetUsersControllerFactory, GetUsersByIdControllerFactory } from '@/main/factories/controllers/users'

export const app = express()
const router = Router()

const createPatientsController = CreatePatientsControllerFactory()
const updatePatientsController = UpdatePatientsControllerFactory()
const deletePatientsController = DeletePatientsControllerFactory()
const getPatientsController = GetPatientsControllerFactory()
const getPatientsByIdController = GetPatientsByIdControllerFactory()

const createClinicsController = CreateClinicsControllerFactory()
const updateClinicsController = UpdateClinicsControllerFactory()
const deleteClinicsController = DeleteClinicsControllerFactory()
const getClinicsController = GetClinicsControllerFactory()
const getClinicsByIdController = GetClinicsByIdControllerFactory()

const createDoctorsSchedulesControllerFactory = CreateDoctorsSchedulesControllerFactory()
const deleteDoctorsSchedulesControllerFactory = DeleteDoctorsSchedulesControllerFactory()

const createSchedulesControllerFactory = CreateSchedulesControllerFactory()

const createUsersControllerFactory = CreateUsersControllerFactory()
const updateUsersControllerFactory = UpdateUsersControllerFactory()
const deleteUsersControllerFactory = DeleteUsersControllerFactory()
const getUsersControllerFactory = GetUsersControllerFactory()
const getUsersByIdControllerFactory = GetUsersByIdControllerFactory()

app.use(cors())
app.use(json())

router.get('/users', async (req, res) => getUsersControllerFactory.handle(req, res))
router.get('/users/:id', async (req, res) => getUsersByIdControllerFactory.handle(req, res))
router.post('/users', async (req, res) => createUsersControllerFactory.handle(req, res))
router.patch('/users/:id', async (req, res) => updateUsersControllerFactory.handle(req, res))
router.delete('/users/:id', async (req, res) => deleteUsersControllerFactory.handle(req, res))

router.get('/patients', async (req, res) => getPatientsController.handle(req, res))
router.get('/patients/:id', async (req, res) => getPatientsByIdController.handle(req, res))
router.post('/patients', async (req, res) => createPatientsController.handle(req, res))
router.patch('/patients/:id', async (req, res) => updatePatientsController.handle(req, res))
router.delete('/patients/:id', async (req, res) => deletePatientsController.handle(req, res))

router.get('/clinics', async (req, res) => getClinicsController.handle(req, res))
router.get('/clinics/:id', async (req, res) => getClinicsByIdController.handle(req, res))
router.post('/clinics', async (req, res) => createClinicsController.handle(req, res))
router.patch('/clinics/:id', async (req, res) => updateClinicsController.handle(req, res))
router.delete('/clinics/:id', async (req, res) => deleteClinicsController.handle(req, res))

router.post('/doctors-schedules', async (req, res) => createDoctorsSchedulesControllerFactory.handle(req, res))
router.delete('/doctors-schedules/:id', async (req, res) => deleteDoctorsSchedulesControllerFactory.handle(req, res))

router.post('/schedules', async (req, res) => createSchedulesControllerFactory.handle(req, res))

app.use(router)
