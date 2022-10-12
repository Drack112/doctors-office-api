import { SendMailDTO } from '@/infra/mail/dtos'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'
import { environment } from '@/main/config'

import mailer, { Transporter } from 'nodemailer'

export class NodemailerProvider {
  private readonly client: Transporter

  constructor (private readonly templateProvider: HandlebarsMailTemplateProvider) {
    const transporter = mailer.createTransport({
      host: environment.mail.local.host,
      port: Number(environment.mail.local.port),
      auth: {
        user: environment.mail.local.user,
        pass: environment.mail.local.password
      }
    })
    this.client = transporter
  }

  public async sendMail (params: SendMailDTO): Promise<void> {
    const { subject } = params
    const { template } = params
    try {
      await this.client.sendMail({
        ...params,
        from: 'no-reply@huron.com',
        subject,
        html: await this.templateProvider.parse(template)
      })
    } catch (e) {
      console.log('error on send email', e)
    }
  }
}
