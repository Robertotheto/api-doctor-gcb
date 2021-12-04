import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DoctorsModule } from "../src/doctors/doctors.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Doctor } from "../src/doctors/entities/doctor.entity";
import {v4 as uuid} from 'uuid';

const doctorEntity = [{
    name: 'Roberto',
    crm: 1234567,
    landline: 66999990000,
    cellphone: 66999991122,
    CEP: 78550434,
    medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
  },
];

const mockDoctorRepository = {
  find: jest.fn().mockResolvedValue(doctorEntity),
  create: jest.fn().mockReturnValue(doctorEntity),
  save: jest.fn().mockResolvedValue(doctorEntity),
  findOneOrFail: jest.fn().mockResolvedValue(doctorEntity),
}
describe('DoctorController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DoctorsModule],

    }).overrideProvider(getRepositoryToken(Doctor)).useValue(mockDoctorRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Select All', () => {
    it('/doctors (GET)', () => {
      return request(app.getHttpServer())
        .get('/doctors')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(doctorEntity)
    });
  })
  describe('Select', () => {
    it('/doctors/:id', async () => {
      const res = await request(app.getHttpServer())
        .get('doctors/49adedf0-0f94-4f5f-b05a-6fff7084275c')
        .expect(doctorEntity)
        .expect(200)
    });
  })
  describe('Insert Doctor', () => {
    it('/doctors (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/doctors')
        .send()
      expect(response.body( {
        id: uuid(),
        name: 'Roberto',
        crm: 1234567,
        landline: 66999990000,
        cellphone: 66999991122,
        CEP: 78550434,
        medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
      }))
    });
  })
});
