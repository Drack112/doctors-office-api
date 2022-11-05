import { PDFProvider } from '@/infra/pdf'

export class GeneratePatientsPDFService {
  constructor (private readonly pdfProvider: PDFProvider) {}

  async execute (): Promise<Buffer> {
    return await this.pdfProvider.generate()
  }
}
