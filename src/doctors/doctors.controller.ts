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
  Query, HttpStatus
} from "@nestjs/common";
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { doctorSchema } from './schema/doctor.schema';
import { YupValidationPipe } from './pipes/yupValidationPipe';
import { FindDoctorDTO } from './dto/find.doctor.dto';
import axios from "axios";

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async selectAll(): Promise<Doctor[]> {
    return await this.doctorsService.selectAll();
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async findDoctors(@Query() queryDto: FindDoctorDTO): Promise<Doctor> {
    const found = await this.doctorsService.search(queryDto);
    return found;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async select(@Param('id') id: string): Promise<Doctor> {
    const doctor = await this.doctorsService.select(id);
    return doctor;
  }
  @Post()
  @UsePipes(new YupValidationPipe(doctorSchema))
  @HttpCode(HttpStatus.CREATED)
  async insert(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
     return await this.doctorsService.insert(createDoctorDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string): Promise<void> {
   await this.doctorsService.softDelete(id);
  }
  @Post('/restore/:id')
  @HttpCode(HttpStatus.OK)
  async restore(@Param('id') id: string): Promise<Doctor> {
    return await this.doctorsService.restore(id);
  }
}
