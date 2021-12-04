import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FindDoctorDTO } from './dto/find.doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { HttpService } from "@nestjs/axios";


@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly httpService: HttpService,
  ) { }
  async insert(createDoctorDTO: CreateDoctorDto): Promise<Doctor> {
    const address = await this.CepCorreios(createDoctorDTO.cep);
    const doctor = this.doctorRepository.create(createDoctorDTO);
    doctor.name = createDoctorDTO.name;
    doctor.crm = createDoctorDTO.crm;
    doctor.landline = createDoctorDTO.landline;
    doctor.cellphone = createDoctorDTO.cellphone;
    doctor.CEP = address;
    doctor.medicalspecialties = createDoctorDTO.medicalspecialties;
    return this.doctorRepository.save(doctor);
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
      if (updateDoctorDto.cep){
        return  await this.CepCorreios(updateDoctorDto.cep);
      }
      this.doctorRepository.merge(doctor, updateDoctorDto);
      return this.doctorRepository.save(doctor);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      const doctor = await this.doctorRepository.findOneOrFail(id);
      await this.doctorRepository.softDelete(doctor);
    }catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async restore(id: string): Promise<Doctor>{
    try {
      await this.restore(id);
      const doctor = await this.doctorRepository.findOneOrFail(id);
      return doctor;
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
  private async CepCorreios(cep: number){
    const {status,data} = await this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise()
    if (status === 200){
      return data;
    }
  }

}
