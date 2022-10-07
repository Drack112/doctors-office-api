import { BaseRepository } from './base-repository'
import { PatientEntity } from '@/infra/entities'

export class PatientsRepository extends BaseRepository<PatientEntity> {}
