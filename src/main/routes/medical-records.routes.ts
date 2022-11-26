import { CreateMedicalRecordsControllerFactory } from '@/main/factories/controllers/medical-records'
import { ensuredAuthenticated, accessProfilePermission, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createMedicalRecordsControllerFactory = CreateMedicalRecordsControllerFactory()

export default (router: Router): void => {
  router.post('/medical-records', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createMedicalRecordsControllerFactory.handle(req, res))
}
