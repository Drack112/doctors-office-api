import { PDFProvider } from '@/infra/pdf'
import { GeneratePatientsPDFService } from '@/services/patients'

describe('GeneratePatientsPDFService', () => {
  const pdfProvider = {} as PDFProvider
  const service = new GeneratePatientsPDFService(pdfProvider)

  describe('execute', () => {
    const buffer = Buffer.from('any-buffer')

    beforeAll(() => {
      pdfProvider.generate = jest.fn().mockResolvedValue(buffer)
    })

    it('should be able to generate pdf successfully', async () => {
      const pdf = await service.execute()

      expect(pdf).toStrictEqual(buffer)
      expect(pdfProvider.generate).toHaveBeenCalledTimes(1)
    })
  })
})
