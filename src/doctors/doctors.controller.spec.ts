import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Doctor } from "./entities/doctor.entity";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

const doctorEntity: Doctor[] = [
  new Doctor({
    name: 'Roberto',
    crm: 1234567,
    landline: 66999990000,
    cellphone: 66999991122,
    CEP: 78550434,
    medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
  }),
  new Doctor({
    name: 'Valeria',
    crm: 5587469,
    landline: 66999990000,
    cellphone: 66999991122,
    CEP: 78550632,
    medicalspecialties: ['Pediatria', 'Clinico Geral'],
  }),
]
const updateDoctorEntity = new Doctor({cellphone: 66999120101})

describe('DoctorsController', () => {
  let doctorController: DoctorsController;
  let doctorService: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [{
        provide: DoctorsService,
        useValue: {
          selectAll: jest.fn().mockResolvedValue(doctorEntity),
          select: jest.fn().mockResolvedValue(doctorEntity[0]),
          insert: jest.fn().mockResolvedValue(doctorEntity[0]),
          update: jest.fn().mockResolvedValue(updateDoctorEntity),
          softDelete: jest.fn().mockResolvedValue(undefined),
          restore: jest.fn().mockResolvedValue(doctorEntity[0]),
        }
      }],
    }).compile();

    doctorController = module.get<DoctorsController>(DoctorsController);
    doctorService = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(doctorController).toBeDefined();
    expect(doctorService).toBeDefined();
  });
  describe('Select All', () => {
    it("should return list doctors", async ()  => {
      const result = await doctorController.selectAll()
      expect(result).toEqual(doctorEntity);
      expect(doctorService.selectAll).toHaveBeenCalledTimes(1);
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'selectAll').mockRejectedValueOnce(new Error());
      expect(doctorController.selectAll()).rejects.toThrowError();
    });
  });
  describe('Insert', () => {
    it("should create new doctor", async () => {
      const data: CreateDoctorDto = {
        name: 'Roberto',
        crm: 1234567,
        landline: 66999990000,
        cellphone: 66999991122,
        CEP: 78550434,
        medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
      };
      const result = await doctorController.insert(data);
      expect(result).toEqual(doctorEntity[0]);
      expect(doctorService.insert).toHaveBeenCalledTimes(1);
      expect(doctorService.insert).toHaveBeenCalledWith(data);
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'insert').mockRejectedValueOnce(new Error());
      const data: CreateDoctorDto = {
        name: 'Roberto',
        crm: 1234567,
        landline: 66999990000,
        cellphone: 66999991122,
        CEP: 78550434,
        medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
      };
      expect(doctorController.insert(data)).rejects.toThrowError();
    });
  })
  describe('Select', () => {
    it("should list one doctor", async () => {
      const result = await doctorController.select('49adedf0-0f94-4f5f-b05a-6fff7084275c');
      expect(result).toEqual(doctorEntity[0]);
      expect(doctorService.select).toHaveBeenCalledTimes(1);
      expect(doctorService.select).toHaveBeenCalledWith('49adedf0-0f94-4f5f-b05a-6fff7084275c');
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'select').mockRejectedValueOnce(new Error());
      expect(doctorController.select('49adedf0-0f94-4f5f-b05a-6fff7084275c')).rejects.toThrowError();
    });
  })
  describe('Update', () => {
    it("should update one doctor", async () => {
      const data: UpdateDoctorDto = {
        cellphone: 66999120101,
      };
      const result = await doctorController.update('49adedf0-0f94-4f5f-b05a-6fff7084275c', data);
      expect(result).toEqual(updateDoctorEntity);
      expect(doctorService.update).toHaveBeenCalledTimes(1);
      expect(doctorService.update).toHaveBeenCalledWith('49adedf0-0f94-4f5f-b05a-6fff7084275c', data);
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'update').mockRejectedValueOnce(new Error());
      const data: UpdateDoctorDto = {
        cellphone: 66999120101,
      };
      expect(doctorController.update('49adedf0-0f94-4f5f-b05a-6fff7084275c', data)).rejects.toThrowError();
    });
  })
  describe('Soft Delete', () => {
    it("should delete one doctor", async () => {
      const result = await doctorController.softDelete('49adedf0-0f94-4f5f-b05a-6fff7084275c');
      expect(result).toBeUndefined();
      expect(doctorService.softDelete).toHaveBeenCalledTimes(1)
      expect(doctorService.softDelete).toHaveBeenCalledWith('49adedf0-0f94-4f5f-b05a-6fff7084275c')
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'softDelete').mockRejectedValueOnce(new Error());
      expect(doctorController.softDelete('49adedf0-0f94-4f5f-b05a-6fff7084275c')).rejects.toThrowError();
    });
  })
  describe('Restore', () => {
    it("should restore one doctpr", async () => {
      const result = await doctorController.restore('49adedf0-0f94-4f5f-b05a-6fff7084275c');
      expect(result).toEqual(doctorEntity[0]);
      expect(doctorService.restore).toHaveBeenCalledTimes(1);
    });
    it("should throw an exception", function() {
      jest.spyOn(doctorService, 'restore').mockRejectedValueOnce(new Error());
      expect(doctorController.restore('49adedf0-0f94-4f5f-b05a-6fff7084275c')).rejects.toThrowError();
    });
  })
});
