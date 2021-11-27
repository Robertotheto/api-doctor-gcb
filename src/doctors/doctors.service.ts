import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FindDoctorDTO } from './dto/find.doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) { }
  async insert(createDoctorDTO: CreateDoctorDto): Promise<Doctor> {
    this.doctorRepository.create(createDoctorDTO);
    return this.doctorRepository.save(createDoctorDTO);
  }

  selectAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async select(id: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOneOrFail(id);
      return doctor;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOneOrFail(id);
      this.doctorRepository.merge(doctor, updateDoctorDto);
      return this.doctorRepository.save(doctor);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      const doctor = await this.doctorRepository.findOneOrFail(id);
      await this.doctorRepository.remove(doctor);
    }catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async search(findDoctorDTO: FindDoctorDTO): Promise<Doctor>{
    const {name,crm,landline,cellphone,CEP,medicalspecialties} = findDoctorDTO;
    const builder = await this.doctorRepository.createQueryBuilder('doctors');
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
      builder.where('doctors.CEP LIKE :CEP', { CEP: `%${CEP}%` });
    }
    if (medicalspecialties) {
      builder.where('doctors.medicalspecialties IN(medicalspecialties)', [
        medicalspecialties,
      ]);
    }

    const [doctor] = await builder.getMany();

    return doctor;

  }

}
