import { GeneratePatientsPDFController } from '@/main/controllers/patients'
import { GeneratePatientsPDFService } from '@/services/patients'
import { PDFProvider } from '@/infra/pdf'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'
import { mysqlSource } from '@/infra/mysql-connection'
import { DoctorEntity, DoctorPatientEntity, PatientEntity } from '@/infra/entities'
import { DoctorsPatientsRepository, DoctorsRepository, PatientsRepository } from '@/infra/repositories'

export const GeneratePatientsPDFControllerFactory = (): GeneratePatientsPDFController => {
  const templateProvider = new HandlebarsMailTemplateProvider()
  const pdfProvider = new PDFProvider(templateProvider)
  const patientModel = mysqlSource.getRepository(PatientEntity)
  const patientsRepository = new PatientsRepository(patientModel)
  const doctorPatientModel = mysqlSource.getRepository(DoctorPatientEntity)
  const doctorsPatientsRepository = new DoctorsPatientsRepository(doctorPatientModel)
  const doctorModel = mysqlSource.getRepository(DoctorEntity)
  const doctorsRepository = new DoctorsRepository(doctorModel)
  const service = new GeneratePatientsPDFService(patientsRepository, doctorsRepository, doctorsPatientsRepository, pdfProvider)
  const controller = new GeneratePatientsPDFController(service)
  return controller
}
