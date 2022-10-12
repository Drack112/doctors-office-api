import 'dotenv/config'

export const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

export const environment = {
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
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER ?? 'user',
    password: process.env.MYSQL_PASSWORD ?? 'password',
    database: process.env.MYSQL_DATABASE ?? 'some-db'
  },
  uploadImage: {
    local: {
      url: process.env.STORAGE_LOCAL_URL ?? 'some-url'
    }
  },
  mail: {
    local: {
      host: process.env.MAIL_HOST ?? 'some-host',
      type: process.env.MAIL_TYPE ?? 'some-auth',
      port: process.env.MAIL_PORT ?? 25,
      user: process.env.MAIL_USERNAME ?? 'some-user',
      password: process.env.MAIL_PASSWORD ?? 'some-password'
    }
  }
}
