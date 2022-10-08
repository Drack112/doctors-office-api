import { CreateMedicalRecordsImagesControllerFactory } from '@/main/factories/controllers/medical-records-images'
// import { accessProfilePermission, ensuredAuthenticated } from '@/middleware'
import uploadConfig from '@/main/config/upload'

import { Router } from 'express'
import multer from 'multer'

const upload = multer(uploadConfig.multer)
const createMedicalRecordsImagesControllerFactory = CreateMedicalRecordsImagesControllerFactory()

export default (router: Router): void => {
  router.post('/medical-records-images',
    upload.single('file'),
    // ensuredAuthenticated(),
    // accessProfilePermission(),
    async (req, res) => createMedicalRecordsImagesControllerFactory.handle(req, res))
}
