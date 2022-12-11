import 'dotenv/config'

const nodeEnv = process.env.NODE_ENV
const port = process.env.PORT
export const dir = nodeEnv === 'dev' ? 'src' : 'dist'
const imagesURL = nodeEnv === 'dev' ? `http://localhost:${port}/images` : 'https://link-prod.com/images'
const apiBaseUrl = process.env.API_BASE_URL

export const environment = {
  port: process.env.PORT ?? 3000,
  jwt: {
    secret: process.env.JWT_SECRET ?? 'some-secret',
    refreshSecretToken: process.env.JWT_SECRET_REFRESH_TOKEN ?? 'some-token',
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN ?? '7d',
    refreshTokenExpiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN ?? '7d'
  },
  encrypt: {
    salt: 10
  },
  mysql: {
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD ?? 'root123',
    database: process.env.MYSQL_DATABASE ?? 'doctors-office-db'
  },
  uploadImage: {
    local: {
      url: `${apiBaseUrl}/uploads` ?? 'some-url'
    },
    publicURL: imagesURL
  },
  mail: {
    local: {
      host: process.env.MAIL_HOST ?? 'some-host',
      type: process.env.MAIL_TYPE ?? 'some-auth',
      port: process.env.MAIL_PORT ?? 25,
      user: process.env.MAIL_USERNAME ?? 'some-user',
      password: process.env.MAIL_PASSWORD ?? 'some-password',
      forgotMailUrl: `${apiBaseUrl}/reset-password` ?? 'some-password'
    }
  }
}
