import express, { Router, json } from 'express'
import cors from 'cors'

import { CreateDoctorControllerFactory, UpdateDoctorControllerFactory, DeleteDoctorControllerFactory, GetDoctorsControllerFactory } from '@/main/factories/controllers/doctors'

export const app = express()
const router = Router()

const createDoctorController = CreateDoctorControllerFactory()
const updateDoctorController = UpdateDoctorControllerFactory()
const deleteDoctorController = DeleteDoctorControllerFactory()
const getDoctorsController = GetDoctorsControllerFactory()

app.use(cors())
app.use(json())

router.get('/doctors', async (req, res) => getDoctorsController.handle(req, res))
router.post('/doctors', async (req, res) => createDoctorController.handle(req, res))
router.patch('/doctors/:id', async (req, res) => updateDoctorController.handle(req, res))
router.delete('/doctors/:id', async (req, res) => deleteDoctorController.handle(req, res))

app.use(router)
