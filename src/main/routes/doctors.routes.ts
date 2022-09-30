import { GetDoctorsSchedulesByDoctorIdControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'

import { Router } from 'express'

const getDoctorsSchedulesByDoctorIdControllerFactory = GetDoctorsSchedulesByDoctorIdControllerFactory()

export default (router: Router): void => {
  router.get('/doctors/schedules/:doctorId?', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => getDoctorsSchedulesByDoctorIdControllerFactory.handle(req, res))
}
