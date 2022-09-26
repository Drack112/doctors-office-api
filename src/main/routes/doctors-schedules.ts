import { CreateDoctorsSchedulesControllerFactory, DeleteDoctorsSchedulesControllerFactory } from '@/main/factories/controllers/doctors-schedules'

import { Router } from 'express'

const createDoctorsSchedulesControllerFactory = CreateDoctorsSchedulesControllerFactory()
const deleteDoctorsSchedulesControllerFactory = DeleteDoctorsSchedulesControllerFactory()

export default (router: Router): void => {
  router.post('/doctors-schedules', async (req, res) => createDoctorsSchedulesControllerFactory.handle(req, res))
  router.delete('/doctors-schedules/:id', async (req, res) => deleteDoctorsSchedulesControllerFactory.handle(req, res))
}
