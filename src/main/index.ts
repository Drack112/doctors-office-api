import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'
import { mysqlSource } from '@/infra/mysql-connection'
import { environment } from '@/main/config'

mysqlSource.initialize()
  .then(() => app.listen(environment.port, () => console.log('Server running!')))
  .catch(console.error)
