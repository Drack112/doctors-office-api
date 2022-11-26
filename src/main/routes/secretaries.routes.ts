import { GetDoctorsSchedulesByDoctorIdControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const getDoctorsSchedulesByDoctorIdControllerFactory = GetDoctorsSchedulesByDoctorIdControllerFactory()

export default (router: Router): void => {
  router.get('/schedules/:doctorId', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getDoctorsSchedulesByDoctorIdControllerFactory.handle(req, res))
}
