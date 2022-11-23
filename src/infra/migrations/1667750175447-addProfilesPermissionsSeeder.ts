import { randomUUID } from 'node:crypto'

import { ProfileTypeEnum } from '../../dtos'

import { MigrationInterface, QueryRunner } from 'typeorm'

type Permissions = Array<{
  profile: string
  permissions: Array<{
    endpoint: string
    actions: boolean[]
  }>
}>

export class addProfilesPermissionsSeeder1667750175447 implements MigrationInterface {
  private readonly data: Permissions = [
    {
      profile: ProfileTypeEnum.admin,
      permissions: [
        {
          endpoint: '/users',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/users/:id',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/patients',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/patients/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/patients/generate-pdf',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/clinics',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/clinics/:id',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/schedules/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors/schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors/schedules/:doctorId?',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors-schedules/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records-images',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records-images/:medicalRecordId',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/dashboard',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/profiles',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/profiles-permissions',
          actions: [true, true, true, true]
        }
      ]
    },
    {
      profile: ProfileTypeEnum.doctor,
      permissions: [
        {
          endpoint: '/users',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/users/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/patients',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/patients/:id',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/patients/generate-pdf',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/clinics',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/clinics/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/schedules/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors/schedules',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/doctors/schedules/:doctorId?',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors-schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors-schedules/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/medical-records-images',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/medical-records-images/:medicalRecordId',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/dashboard',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/profiles',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/profiles-permissions',
          actions: [false, false, false, false]
        }
      ]
    },
    {
      profile: ProfileTypeEnum.secretary,
      permissions: [
        {
          endpoint: '/users',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/users/:id',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/patients',
          actions: [true, true, true, false]
        },
        {
          endpoint: '/patients/:id',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/patients/generate-pdf',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/clinics',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/clinics/:id',
          actions: [false, true, false, false]
        },
        {
          endpoint: '/schedules',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/schedules/:id',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/doctors/schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors/schedules/:doctorId?',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/doctors-schedules',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/doctors-schedules/:id',
          actions: [true, true, true, true]
        },
        {
          endpoint: '/medical-records',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records-images',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/medical-records-images/:medicalRecordId',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/dashboard',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/profiles',
          actions: [false, false, false, false]
        },
        {
          endpoint: '/profiles-permissions',
          actions: [false, false, false, false]
        }
      ]
    }
  ]

  public async up (queryRunner: QueryRunner): Promise<void> {
    await this.insertPermissions(queryRunner)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM profiles_permissions')
  }

  private async insertPermissions (queryRunner: QueryRunner): Promise<void> {
    for (const item of this.data) {
      const { permissions } = item
      for (const permission of permissions) {
        const profileId = await this.getProfileByName(queryRunner, item.profile)
        const moduleId = await this.getModuleByEndpoint(queryRunner, permission.endpoint)
        const [create, read, update, exclude] = permission.actions
        await queryRunner.query(`
          INSERT INTO profiles_permissions VALUES
            ('${randomUUID()}', '${moduleId}', '${profileId}', ${create}, ${read}, ${update}, ${exclude}, CURRENT_TIMESTAMP, null)
        `)
      }
    }
  }

  private async getModuleByEndpoint (queryRunner: QueryRunner, endpoint: string): Promise<void> {
    const [module] = await queryRunner.query(`SELECT * FROM modules WHERE endpoint = '${endpoint}'`)
    return module.id
  }

  private async getProfileByName (queryRunner: QueryRunner, name: string): Promise<void> {
    const [profile] = await queryRunner.query(`SELECT * FROM profiles WHERE name = '${name}'`)
    return profile.id
  }
}
