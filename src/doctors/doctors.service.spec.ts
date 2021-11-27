import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
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
];
const updateDoctorEntity = new Doctor({cellphone: 66999120101})

describe('DoctorsService', () => {
  let doctorService: DoctorsService;
  let doctorRepository: Repository<Doctor>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            find: jest.fn().mockResolvedValue(doctorEntity),
            create: jest.fn().mockReturnValue(doctorEntity[0]),
            save: jest.fn().mockResolvedValue(doctorEntity[0]),
            findOneOrFail: jest.fn().mockResolvedValue(doctorEntity[0]),
            merge: jest.fn().mockResolvedValue(updateDoctorEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    doctorService = module.get<DoctorsService>(DoctorsService);
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });
  describe('Select All', () => {
    it('should be list all doctors ', async () => {
      const result = await doctorService.selectAll();
      expect(result).toEqual(doctorEntity);
      expect(doctorRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', function () {
      jest.spyOn(doctorRepository, 'find').mockRejectedValueOnce(new Error());
      expect(doctorService.selectAll()).rejects.toThrowError();
    });
  });
  describe('Select', () => {
    it('should  be list one doctor', async () => {
      const result = await doctorService.select(
        '49adedf0-0f94-4f5f-b05a-6fff7084275c',
      );
      expect(result).toEqual(doctorEntity[0]);
      expect(doctorRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });
    it('should throw an not found excepetion', function () {
      jest
        .spyOn(doctorRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(
        doctorService.select('49adedf0-0f94-4f5f-b05a-6fff7084275c'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
  describe('Insert', () => {
    it('should be create one doctor', async () => {
      const data: CreateDoctorDto = {
        name: 'Roberto',
        crm: 1234567,
        landline: 66999990000,
        cellphone: 66999991122,
        cep: 78550434,
        medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
      };
      const result = await doctorService.insert(data);
      expect(result).toEqual(doctorEntity[0]);
      expect(doctorRepository.create).toHaveBeenCalledTimes(1);
      expect(doctorRepository.save).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', function () {
      const data: CreateDoctorDto = {
        name: 'Roberto',
        crm: 1234567,
        landline: 66999990000,
        cellphone: 66999991122,
        cep: 78550434,
        medicalspecialties: ['Cardiologia', 'NeuroCirurgião'],
      };
      jest.spyOn(doctorRepository, 'save').mockRejectedValueOnce(new Error());
      expect(doctorService.insert(data)).rejects.toThrowError();
    });
  });
  describe('Update', () => {
    it("should be update one doctor", async () => {
      const data: UpdateDoctorDto = {
        cellphone: 66999120101
      }
      jest
        .spyOn(doctorRepository, 'save')
        .mockResolvedValueOnce(updateDoctorEntity);
      const result = await doctorService.update('49adedf0-0f94-4f5f-b05a-6fff7084275c', data)
      expect(result).toEqual(updateDoctorEntity);
      expect(doctorRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(doctorRepository.merge).toHaveBeenCalledTimes(1);
      expect(doctorRepository.save).toHaveBeenCalledTimes(1);
    });
    it("should throw an not found excepetion", function() {
      jest.spyOn(doctorRepository,'findOneOrFail').mockRejectedValueOnce(new Error());
      const data: UpdateDoctorDto = {
        cellphone: 66999120101
      }
      expect(doctorService.update('49adedf0-0f94-4f5f-b05a-6fff7084275c', data)).rejects.toThrowError(NotFoundException);
    });
    it("should throw an excepetion", function() {
      jest.spyOn(doctorRepository,'save').mockRejectedValueOnce(new Error());
      const data: UpdateDoctorDto = {
        cellphone: 66999120101
      }
      expect(doctorService.update('49adedf0-0f94-4f5f-b05a-6fff7084275c', data)).rejects.toThrowError();
    });
  })
  describe('Soft Delete', () => {
    it("should delete one doctor", async ()  => {
      const result = await doctorService.softDelete('49adedf0-0f94-4f5f-b05a-6fff7084275c');
      expect(result).toBeUndefined();
      expect(doctorRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(doctorRepository.remove).toHaveBeenCalledTimes(1);
    });
    it("should throw an excepetion", function() {
      jest.spyOn(doctorRepository,'findOneOrFail').mockRejectedValueOnce(new Error());
      expect(doctorService.softDelete('49adedf0-0f94-4f5f-b05a-6fff7084275c')).rejects.toThrowError(NotFoundException);
    });
    it("should throw an excepetion", function() {
      jest.spyOn(doctorRepository,'remove').mockRejectedValueOnce(new Error());
      expect(doctorService.softDelete('49adedf0-0f94-4f5f-b05a-6fff7084275c')).rejects.toThrowError();
    });
  })
});
