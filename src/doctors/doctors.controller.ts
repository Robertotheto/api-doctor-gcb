import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  Query,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { doctorSchema } from './schema/doctor.schema';
import { YupValidationPipe } from './pipes/yupValidationPipe';
import { FindDoctorDTO } from './dto/find.doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @HttpCode(200)
  selectAll(): Promise<Doctor[]> {
    return this.doctorsService.selectAll();
  }
  @Get('/search')
  @HttpCode(200)
  async findDoctors(@Query() queryDto: FindDoctorDTO): Promise<{ doctors: Doctor[]; }> {
    const found = await this.doctorsService.findDoctors(queryDto);
    return found;
  }

  @Get(':id')
  @HttpCode(200)
  select(@Param('id') id: string): Promise<Doctor> {
    const doctor = this.doctorsService.select(id);
    return doctor;
  }
  @Post()
  @UsePipes(new YupValidationPipe(doctorSchema))
  @HttpCode(201)
  async insert(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorsService.insert(createDoctorDto);
    return doctor;
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  softDelete(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.softDelete(id);
  }
}
