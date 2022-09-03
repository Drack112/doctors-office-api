import express, { Router, json } from 'express'
import cors from 'cors'

import { CreateDoctorControllerFactory } from '@/main/factories/controllers/doctors'

export const app = express()
const router = Router()

const createDoctorController = CreateDoctorControllerFactory()

app.use(cors())
app.use(json())

router.post('/doctors', async (req, res) => createDoctorController.handle(req, res))

app.use(router)
