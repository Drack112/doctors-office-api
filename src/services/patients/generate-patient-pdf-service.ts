import { RequestError } from '@/errors'
import { PDFProvider } from '@/infra/pdf'
import { DoctorsPatientsRepository, DoctorsRepository, PatientsRepository } from '@/infra/repositories'

import { formatDate } from '@/utils'

export class GeneratePatientsPDFService {
  constructor (
    private readonly patientsRepository: PatientsRepository,
    private readonly doctorsRepository: DoctorsRepository,
    private readonly doctorsPatientsRepository: DoctorsPatientsRepository,
    private readonly pdfProvider: PDFProvider
  ) {}

  async execute (patientId: string, userId: string): Promise<Buffer> {
    const patient = await this.patientsRepository.findById(patientId)
    if (!patient) throw new RequestError('Patient not found.')
    const doctor = await this.doctorsRepository.findByUserId(userId)
    const doctorsPatient = await this.doctorsPatientsRepository.findByPacientAndDoctor(patientId, doctor!.id)
    if (!doctorsPatient) throw new RequestError('Patient never have consulted with this doctor.')
    const patientData = { ...patient, date: formatDate(patient.medicalRecord.date) }
    return await this.pdfProvider.generate(patientData)
  }
}
