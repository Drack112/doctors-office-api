import { ParseMailTemplateDTO } from '@/infra/mail/dtos'

export type SendMailDTO = {
  to: string
  subject: string
  template: ParseMailTemplateDTO
}
