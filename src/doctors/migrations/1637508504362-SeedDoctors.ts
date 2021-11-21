import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  Timestamp,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Doctor } from '../entities/doctor.entity';
import axios from 'axios';

const id = uuid();
const cep = 78550434;
const medicalspecialties: string[] = [];
medicalspecialties.push(
  'Alergologia',
  'Angiologia',
  'Buco maxilo',
  'Cardiologia clínca',
  'Cardiologia infantil',
  'Cirurgia cabeça e pescoço',
  'Cirurgia cardíaca',
  'Cirurgia de tórax',
);

export class SeedDoctors1637508504362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const doctorSeed = getRepository(Doctor).create({
      id: id,
      name: 'Ben Carson',
      crm: 1258643,
      landline: 66999990000,
      cellphone: 66999991122,
      CEP: (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data,
      medicalspecialties: medicalspecialties,
    });
    await getRepository(Doctor).save(doctorSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
