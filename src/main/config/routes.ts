import express, { Router, json } from 'express'
import cors from 'cors'

import { CreateDoctorControllerFactory, UpdateDoctorControllerFactory } from '@/main/factories/controllers/doctors'

export const app = express()
const router = Router()

const createDoctorController = CreateDoctorControllerFactory()
const updateDoctorController = UpdateDoctorControllerFactory()

app.use(cors())
app.use(json())

router.post('/doctors', async (req, res) => createDoctorController.handle(req, res))
router.patch('/doctors/:id', async (req, res) => updateDoctorController.handle(req, res))

app.use(router)
