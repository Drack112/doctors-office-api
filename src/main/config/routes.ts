import express, { Router, json } from 'express'
import cors from 'cors'

import { CreateDoctorControllerFactory, UpdateDoctorControllerFactory, DeleteDoctorControllerFactory, GetDoctorsControllerFactory, GetDoctorByIdControllerFactory } from '@/main/factories/controllers/doctors'
import { CreateSecretariesControllerFactory, UpdateSecretariesControllerFactory, DeleteSecretariesControllerFactory, GetSecretariesControllerFactory } from '@/main/factories/controllers/secretaries'

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

app.use(cors())
app.use(json())

router.get('/doctors', async (req, res) => getDoctorsController.handle(req, res))
router.get('/doctors/:id', async (req, res) => getDoctorByIdontroller.handle(req, res))
router.post('/doctors', async (req, res) => createDoctorController.handle(req, res))
router.patch('/doctors/:id', async (req, res) => updateDoctorController.handle(req, res))
router.delete('/doctors/:id', async (req, res) => deleteDoctorController.handle(req, res))

router.get('/secretaries', async (req, res) => getSecretariesController.handle(req, res))
router.post('/secretaries', async (req, res) => createSecretariesController.handle(req, res))
router.patch('/secretaries/:id', async (req, res) => updateSecretariesController.handle(req, res))
router.delete('/secretaries/:id', async (req, res) => deleteSecretariesController.handle(req, res))

app.use(router)
