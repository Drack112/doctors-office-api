import { RequestError } from '@/errors'
import { PDFProvider } from '@/infra/pdf'
import { DoctorsPatientsRepository, DoctorsRepository, PatientsRepository } from '@/infra/repositories'
import { GeneratePatientsPDFService } from '@/services/patients'
import { doctorModel, doctorPatientModel, patientModel } from '@/tests/mocks'

describe('GeneratePatientsPDFService', () => {
  const patientsRepository = {} as PatientsRepository
  const doctorsRepository = {} as DoctorsRepository
  const doctorsPatientsRepository = {} as DoctorsPatientsRepository
  const pdfProvider = {} as PDFProvider
  const service = new GeneratePatientsPDFService(patientsRepository, doctorsRepository, doctorsPatientsRepository, pdfProvider)

  describe('execute', () => {
    const buffer = Buffer.from('any-buffer')
    const patientId = 'any-patient-id'
    const userId = 'any-user-id'

    beforeAll(() => {
      doctorsRepository.findByUserId = jest.fn()
      doctorsPatientsRepository.findByPacientAndDoctor = jest.fn()
      patientsRepository.findById = jest.fn()
      pdfProvider.generate = jest.fn().mockResolvedValue(buffer)
    })

    it('should be able to generate pdf successfully', async () => {
      doctorsRepository.findByUserId = jest.fn().mockResolvedValue(doctorModel)
      doctorsPatientsRepository.findByPacientAndDoctor = jest.fn().mockResolvedValue(doctorPatientModel)
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)

      const pdf = await service.execute(patientId, userId)

      expect(pdf).toStrictEqual(buffer)
      expect(pdfProvider.generate).toHaveBeenCalledTimes(1)
    })

    it('should not be able to generate pdf successfully if no patient were found', async () => {
      doctorsRepository.findByUserId = jest.fn().mockResolvedValue(doctorModel)
      doctorsPatientsRepository.findByPacientAndDoctor = jest.fn().mockResolvedValue(doctorPatientModel)
      patientsRepository.findById = jest.fn()
      const error = new RequestError('Patient not found.')

      const promise = service.execute(patientId, userId)

      await expect(promise).rejects.toThrow(error)

      expect(pdfProvider.generate).not.toHaveBeenCalled()
    })

    it('should not be able to generate pdf successfully if atient never have consulted with specific doctor', async () => {
      doctorsRepository.findByUserId = jest.fn().mockResolvedValue(doctorModel)
      patientsRepository.findById = jest.fn().mockResolvedValue(patientModel)
      doctorsPatientsRepository.findByPacientAndDoctor = jest.fn()
      const error = new RequestError('Patient never have consulted with this doctor.')

      const promise = service.execute(patientId, userId)

      await expect(promise).rejects.toThrow(error)

      expect(pdfProvider.generate).not.toHaveBeenCalled()
    })
  })
})
