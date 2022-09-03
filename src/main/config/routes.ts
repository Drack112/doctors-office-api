import express, { Router, json } from 'express'
import cors from 'cors'

import { CreateDoctorControllerFactory, UpdateDoctorControllerFactory, DeleteDoctorControllerFactory, GetDoctorsControllerFactory, GetDoctorByIdControllerFactory } from '@/main/factories/controllers/doctors'
import { CreateSecretariesControllerFactory, UpdateSecretariesControllerFactory, DeleteSecretariesControllerFactory, GetSecretariesControllerFactory, GetSecretariesByIdControllerFactory } from '@/main/factories/controllers/secretaries'
import { CreatePatientsControllerFactory, UpdatePatientsControllerFactory, DeletePatientsControllerFactory, GetPatientsControllerFactory, GetPatientsByIdControllerFactory } from '@/main/factories/controllers/patients'

export const app = express()
const router = Router()

const createDoctorController = CreateDoctorControllerFactory()
const updateDoctorController = UpdateDoctorControllerFactory()
const deleteDoctorController = DeleteDoctorControllerFactory()
const getDoctorsController = GetDoctorsControllerFactory()
const getDoctorByIdontroller = GetDoctorByIdControllerFactory()

const createSecretariesController = CreateSecretariesControllerFactory()
const updateSecretariesController = UpdateSecretariesControllerFactory()
const deleteSecretariesController = DeleteSecretariesControllerFactory()
const getSecretariesController = GetSecretariesControllerFactory()
const getSecretariesByIdontroller = GetSecretariesByIdControllerFactory()

const createPatientsController = CreatePatientsControllerFactory()
const updatePatientsController = UpdatePatientsControllerFactory()
const deletePatientsController = DeletePatientsControllerFactory()
const getPatientsController = GetPatientsControllerFactory()
const getPatientsByIdController = GetPatientsByIdControllerFactory()

app.use(cors())
app.use(json())

router.get('/doctors', async (req, res) => getDoctorsController.handle(req, res))
router.get('/doctors/:id', async (req, res) => getDoctorByIdontroller.handle(req, res))
router.post('/doctors', async (req, res) => createDoctorController.handle(req, res))
router.patch('/doctors/:id', async (req, res) => updateDoctorController.handle(req, res))
router.delete('/doctors/:id', async (req, res) => deleteDoctorController.handle(req, res))

router.get('/secretaries', async (req, res) => getSecretariesController.handle(req, res))
router.get('/secretaries/:id', async (req, res) => getSecretariesByIdontroller.handle(req, res))
router.post('/secretaries', async (req, res) => createSecretariesController.handle(req, res))
router.patch('/secretaries/:id', async (req, res) => updateSecretariesController.handle(req, res))
router.delete('/secretaries/:id', async (req, res) => deleteSecretariesController.handle(req, res))

router.get('/patients', async (req, res) => getPatientsController.handle(req, res))
router.get('/patients/:id', async (req, res) => getPatientsByIdController.handle(req, res))
router.post('/patients', async (req, res) => createPatientsController.handle(req, res))
router.patch('/patients/:id', async (req, res) => updatePatientsController.handle(req, res))
router.delete('/patients/:id', async (req, res) => deletePatientsController.handle(req, res))

app.use(router)
