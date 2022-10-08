import { resolve } from 'node:path'
import crypto from 'node:crypto'

import multer, { StorageEngine } from 'multer'

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp')
const uploadsFolder = resolve(__dirname, '..', '..', '..', 'uploads')

interface IUploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
  config: {
    disk: {}
    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER ?? 'disk',
  tmpFolder,
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename (_, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        return callback(null, fileName)
      }
    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-doctors-office-bucket'
    }
  }
} as IUploadConfig
