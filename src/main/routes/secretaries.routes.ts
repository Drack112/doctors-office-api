import { GetDoctorsSchedulesByDoctorIdControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { GetSecretariesByClinicControllerFactory } from '@/main/factories/controllers/secretaries'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const getDoctorsSchedulesByDoctorIdControllerFactory = GetDoctorsSchedulesByDoctorIdControllerFactory()
const getSecretariesByClinicControllerFactory = GetSecretariesByClinicControllerFactory()

export default (router: Router): void => {
  router.get('/secretaries-by-clinic/:clinicId', ensuredAuthenticated(), clinicMiddleware(), async (req, res) => getSecretariesByClinicControllerFactory.handle(req, res))
  router.get('/schedules/:doctorId', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getDoctorsSchedulesByDoctorIdControllerFactory.handle(req, res))
}
