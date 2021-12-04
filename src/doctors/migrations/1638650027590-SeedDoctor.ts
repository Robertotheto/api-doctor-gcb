import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { SeedDoctor } from "./Seed/SeedDoctor";
import { Doctor } from "../entities/doctor.entity";
import axios from "axios";

export class SeedDoctor1638650027590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(
          SeedDoctor.map(async (doctor) => {
              await getRepository(Doctor).save({
                  id: doctor.id,
                  name: doctor.name,
                  crm: doctor.crm,
                  landline: doctor.landline,
                  cellphone: doctor.cellphone,
                  CEP: (
                    await axios.get(`https://viacep.com.br/ws/${doctor.CEP}/json/`)
                  ).data,
                  medicalspecialties: doctor.medicalspecialties,
              })
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctors');
    }

}
