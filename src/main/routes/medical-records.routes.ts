import { CreateMedicalRecordsControllerFactory } from '@/main/factories/controllers/medical-records'

import { Router } from 'express'

const createMedicalRecordsControllerFactory = CreateMedicalRecordsControllerFactory()

export default (router: Router): void => {
  router.post('/medical-records', async (req, res) => createMedicalRecordsControllerFactory.handle(req, res))
}
