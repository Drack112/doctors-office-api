import { CreateMedicalRecordsImagesControllerFactory, GetMedicalRecordsImagesByMedicalRecordIdControllerFactory } from '@/main/factories/controllers/medical-records-images'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'
import uploadConfig from '@/main/config/upload'

import { Router } from 'express'
import multer from 'multer'

const upload = multer(uploadConfig.multer)
const createMedicalRecordsImagesControllerFactory = CreateMedicalRecordsImagesControllerFactory()
const getMedicalRecordsImagesByMedicalRecordIdControllerFactory = GetMedicalRecordsImagesByMedicalRecordIdControllerFactory()

export default (router: Router): void => {
  router.post('/medical-records-images',
    upload.single('file'),
    ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(),
    async (req, res) => createMedicalRecordsImagesControllerFactory.handle(req, res))
  router.get('/medical-records-images/:medicalRecordId', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getMedicalRecordsImagesByMedicalRecordIdControllerFactory.handle(req, res))
}
