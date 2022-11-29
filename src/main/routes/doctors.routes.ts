import { GetDoctorsSchedulesByDoctorIdControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { GetDoctorsByClinicControllerFactory } from '@/main/factories/controllers/doctors'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const getDoctorsSchedulesByDoctorIdControllerFactory = GetDoctorsSchedulesByDoctorIdControllerFactory()
const getDoctorsByClinicControllerFactory = GetDoctorsByClinicControllerFactory()

export default (router: Router): void => {
  router.get('/doctors-by-clinic/:clinicId', ensuredAuthenticated(), clinicMiddleware(), async (req, res) => getDoctorsByClinicControllerFactory.handle(req, res))
  router.get('/doctors/schedules', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getDoctorsSchedulesByDoctorIdControllerFactory.handle(req, res))
  router.get('/doctors/schedules/:doctorId?', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getDoctorsSchedulesByDoctorIdControllerFactory.handle(req, res))
}
