import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPatientsTable1662234506897 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'cpf',
            type: 'varchar'
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
            default: null
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'cep',
            type: 'varchar'
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
            default: null
          },
          {
            name: 'birthOfDate',
            type: 'varchar'
          },
          {
            name: 'responsibleName',
            type: 'varchar',
            isNullable: true,
            default: null
          },
          {
            name: 'responsibleCpf',
            type: 'varchar',
            isNullable: true,
            default: null
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: null
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
  }
}
