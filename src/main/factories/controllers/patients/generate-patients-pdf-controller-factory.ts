import { GeneratePatientsPDFController } from '@/main/controllers/patients'
import { GeneratePatientsPDFService } from '@/services/patients'
import { PDFProvider } from '@/infra/pdf'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'

export const GeneratePatientsPDFControllerFactory = (): GeneratePatientsPDFController => {
  const templateProvider = new HandlebarsMailTemplateProvider()
  const pdfProvider = new PDFProvider(templateProvider)
  const service = new GeneratePatientsPDFService(pdfProvider)
  const controller = new GeneratePatientsPDFController(service)
  return controller
}
