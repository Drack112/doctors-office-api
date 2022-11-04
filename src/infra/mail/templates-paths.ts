import { resolve } from 'node:path'

export const templatesPaths = {
  RESET_PASSWORD: resolve(__dirname, 'views/reset-password/index.hbs'),
  FORGOT_PASSWORD: resolve(__dirname, 'views/forgot-password/index.hbs')
}
