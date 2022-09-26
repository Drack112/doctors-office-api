import { join } from 'node:path'
import { readdirSync } from 'node:fs'

import { Express, Router, json } from 'express'
import cors from 'cors'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  app.use(cors())
  app.use(json())
  app.use(router)
}
