import { join, resolve } from 'node:path'
import { readdirSync } from 'node:fs'

import { Express, Router, json, static as expressStatic } from 'express'
import cors from 'cors'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  const mailImagesDir = resolve(__dirname, '../../infra/mail/views/reset-password/images')

  app.use(cors())
  app.use(json())
  app.use('/images', expressStatic(mailImagesDir))
  app.use(router)
}
