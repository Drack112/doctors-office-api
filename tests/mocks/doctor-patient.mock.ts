
import { DoctorPatientDTO } from '@/dtos'
import { DoctorPatientModel } from '@/models/doctor-patient'

export const mockDoctorPatient: DoctorPatientDTO = {
  doctorId: 'any-doctor-id',
  patientId: 'any-patient-id'
}

export const doctorPatientModel: DoctorPatientModel = {
  id: 'any-id',
  ...mockDoctorPatient
}
