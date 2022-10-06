import crypto from 'node:crypto'
import path from 'node:path'

import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp')

interface IUploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
}

export default {
  driver: process.env.STORAGE_DRIVER ?? 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename (_, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname
          .replace(' ', '-')
          .replace(/[/\\:]/g, '_')}`

        return callback(null, fileName)
      }
    }),
    limits: {
      fileSize: 8000000 // Compliant: 8MB
    }
  }

} as IUploadConfig
