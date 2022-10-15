import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { templatesPaths } from '@/infra/mail/templates-paths'
import { environment } from '@/main/config'

export class SendMailService {
  constructor (private readonly mailProvider: NodemailerProvider) {}

  async execute (template: string, data: any, subject: string): Promise<void> {
    const { publicURL } = environment.uploadImage
    await this.mailProvider.sendMail({
      to: 'no-reply@gmail.com',
      subject,
      template: {
        file: templatesPaths[template.toUpperCase() as keyof typeof templatesPaths],
        variables: {
          data,
          publicURL
        }
      }
    })
  }
}
