import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Doctor } from "../entities/doctor.entity";
import {v4 as uuid} from 'uuid';
import axios from "axios";

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
)
export class SeedDoctor1638650027590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<Doctor> {
        const DoctorSeed = getRepository(Doctor).create({
            id: uuid(),
            name: "Ben Carson",
            crm: 1859648,
            landline: 66999992020,
            cellphone: 66999990101,
            CEP: (await axios.get(`https://viacep.com.br/ws/78550434/json/`)).data,
            medicalspecialties: medicalspecialties,
        }
    )
        return await getRepository(Doctor).save(DoctorSeed)
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctors');
    }

}
