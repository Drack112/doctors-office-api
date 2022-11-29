import { UsersClinicsRepository } from '@/infra/repositories'
import { GetDoctorsByClinicService } from '@/services/doctors'

const doctors = [
  {
    id: '05e96cf3-e405-48d9-be68-d9b3bd051b95',
    user_id: '19412dbc-79f9-4fcf-8273-ae8b6734ce4e',
    clinic_id: '1686ed5b-3ad8-4e84-b686-51a842e32d3a',
    name: 'string',
    email: 'doctor@gmail.com',
    password: '$2a$10$VTLFlHw2t/4tqrxtVHFryOspg.FRZmlhPsmbmNrERptlWnJP7aXcO',
    profile_id: '180819f8-cc2e-4bce-9860-f4d083189fc6',
    created_at: '2022-11-20T17:18:05.000Z',
    updated_at: null,
    first_access_at: '2022-11-20T17:18:40.000Z',
    address: 'string',
    cep: 'string',
    description: 'string',
    phone: 'string',
    type: null,
    administrator_id: '0a80b597-de9e-4796-9ce7-ee9c3eb2e02a',
    cpf: '123'
  }
]

describe('GetDoctorsByClinicService', () => {
  const usersClinicsRepository = {} as UsersClinicsRepository
  const service = new GetDoctorsByClinicService(usersClinicsRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersClinicsRepository.getUsersByClinic = jest.fn()
    })

    it('should be able to get a list of doctors by clinicId', async () => {
      usersClinicsRepository.getUsersByClinic = jest.fn().mockResolvedValue(doctors)

      await service.execute('any-clinic-id', 'doctors')

      expect(usersClinicsRepository.getUsersByClinic).toHaveBeenNthCalledWith(1, 'any-clinic-id', 'doctors')
    })
  })
})
