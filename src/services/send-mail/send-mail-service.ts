import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { templatesPaths } from '@/infra/mail/templates-paths'

export class SendMailService {
  constructor (private readonly mailProvider: NodemailerProvider) {}

  async sendMail (template: string, data: any, subject: string): Promise<void> {
    await this.mailProvider.sendMail({
      to: 'no-reply@gmail.com',
      subject,
      template: {
        file: templatesPaths[template.toUpperCase() as keyof typeof templatesPaths],
        variables: data
      }
    })
  }
}
