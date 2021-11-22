import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FindDoctorDTO } from './dto/find.doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRespository: Repository<Doctor>,
  ) {}
  async insert({
    name,
    crm,
    cep,
    landline,
    cellphone,
    medicalspecialties,
  }: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRespository.create();
    doctor.name = name;
    doctor.crm = crm;
    doctor.landline = landline;
    doctor.cellphone = cellphone;
    doctor.CEP = (
      await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    ).data;
    doctor.medicalspecialties = medicalspecialties;

    return this.doctorRespository.save(doctor);
  }

  selectAll(): Promise<Doctor[]> {
    return this.doctorRespository.find();
  }

  async select(id: string): Promise<Doctor> {
    const doctor = await this.doctorRespository.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`This action select a ${id} doctor`);
    }
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRespository.preload({
      id: String(id),
      ...updateDoctorDto,
    });
    if (!doctor) {
      throw new NotFoundException(`This action update a ${id} doctor`);
    }
    return this.doctorRespository.save(doctor);
  }

  async softDelete(id: string): Promise<Doctor> {
    const doctor = await this.doctorRespository.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`This action update a ${id} doctor`);
    }
    return this.doctorRespository.remove(doctor);
  }
  async findDoctors({
    name,
    crm,
    landline,
    cellphone,
    CEP,
    medicalspecialties,
  }: FindDoctorDTO): Promise<{ doctors: Doctor[] }> {
    const builder = await this.doctorRespository.createQueryBuilder('doctors');
    if (name) {
      builder.where('doctors.name Like :name', { name: `%${name}%` });
    }
    if (crm) {
      builder.where('doctors.crm Like :crm', { crm: `%${crm}%` });
    }
    if (landline) {
      builder.where('doctors.landline Like :landline', {
        landline: `%${landline}%`,
      });
    }
    if (cellphone) {
      builder.where('doctors.cellphone Like :cellphone', {
        cellphone: `%${cellphone}%`,
      });
    }
    if (CEP) {
      builder.where('doctors.CEP Like :CEP', { CEP: `%${CEP}%` });
    }

    if (medicalspecialties) {
      builder.where('doctors.medicalspecialties IN(medicalspecialties)');
    }

    const doctors = await builder.getMany();

    return {
      doctors,
    };
  }
}
