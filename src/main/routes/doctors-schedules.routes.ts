import { CreateDoctorsSchedulesControllerFactory, DeleteDoctorsSchedulesControllerFactory } from '@/main/factories/controllers/doctors-schedules'
import { ensuredAuthenticated, accessProfilePermission } from '@/middleware'

import { Router } from 'express'

const createDoctorsSchedulesControllerFactory = CreateDoctorsSchedulesControllerFactory()
const deleteDoctorsSchedulesControllerFactory = DeleteDoctorsSchedulesControllerFactory()

export default (router: Router): void => {
  router.post('/doctors-schedules', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => createDoctorsSchedulesControllerFactory.handle(req, res))
  router.delete('/doctors-schedules/:id', ensuredAuthenticated(), accessProfilePermission(), async (req, res) => deleteDoctorsSchedulesControllerFactory.handle(req, res))
}
