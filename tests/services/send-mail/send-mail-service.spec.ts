import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { templatesPaths } from '@/infra/mail/templates-paths'
import { SendMailService } from '@/services/send-mail'

import { mockUser } from '@/tests/mocks'

describe('SendMailService', () => {
  const mailProvider = {} as NodemailerProvider
  const sendMailService = new SendMailService(mailProvider)

  beforeAll(() => {
    mailProvider.sendMail = jest.fn()
  })

  it('should be able to send mail', async () => {
    await sendMailService.execute('any-template', mockUser, 'any-subject')

    expect(mailProvider.sendMail).toHaveBeenNthCalledWith(1, {
      to: 'no-reply@gmail.com',
      subject: 'any-subject',
      template: {
        file: templatesPaths['any_template' as keyof typeof templatesPaths],
        variables: mockUser
      }
    })
  })
})
