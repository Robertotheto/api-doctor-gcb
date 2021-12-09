import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query, HttpStatus, ParseUUIDPipe, ValidationPipe
} from "@nestjs/common";
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { FindDoctorDTO } from './dto/find.doctor.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DoctorSwagger } from "./swagger/doctor.swagger";
import { BadRequestSwagger } from "./helper/swagger/BadRequestSwagger";
import { NotFoundSwagger } from "./helper/swagger/NotFoundSwagger";
import axios from "axios";

@Controller('/api/v1/doctors')
@ApiTags('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({summary: 'List all doctors'})
  @ApiResponse({status: 200, description: 'List of doctors return success', type: DoctorSwagger, isArray: true})
  @HttpCode(HttpStatus.OK)
  async selectAll(): Promise<Doctor[]> {
    return await this.doctorsService.selectAll();
  }

  @Get('/search')
  @ApiOperation({summary: 'List one doctor, name field in search'})
  @ApiResponse({status: 200, description: 'Search for a doctor by field name, returned successfully',type: DoctorSwagger})
  @HttpCode(HttpStatus.OK)
  async findDoctors(@Query() queryDto: FindDoctorDTO): Promise<Doctor> {
    const found = await this.doctorsService.search(queryDto);
    return found;
  }

  @Get(':id')
  @ApiOperation({summary: 'List one doctor, by id'})
  @ApiResponse({status: 200, description: 'One doctor by id, returned successfully',type: DoctorSwagger})
  @ApiResponse({status: 404, description: 'Doctor not found', type: NotFoundSwagger})
  @HttpCode(HttpStatus.OK)
  async select(@Param('id', new ParseUUIDPipe()) id: string): Promise<Doctor> {
    const doctor = await this.doctorsService.select(id);
    return doctor;
  }
  @Post()
  @ApiOperation({summary: 'Creat one doctor'})
  @ApiResponse({status: 201, description: 'Creat one doctor, returned successfully',type: DoctorSwagger})
  @ApiResponse({status: 400, description: 'invalid parameters', type: BadRequestSwagger})
  @HttpCode(HttpStatus.CREATED)
  async insert(@Body(new ValidationPipe(({forbidNonWhitelisted: true,whitelist: true, transform: true}))) createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorsService.insert(createDoctorDto)
    return doctor;
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update one doctor, by id'})
  @ApiResponse({status: 200, description: 'Update one doctor by id, returned successfully',type: DoctorSwagger})
  @ApiResponse({status: 400, description: 'invalid parameters', type: BadRequestSwagger})
  @ApiResponse({status: 404, description: 'Doctor not found', type: NotFoundSwagger})
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe(({forbidNonWhitelisted: true,whitelist: true, transform: true}))) updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete one doctor, by id'})
  @ApiResponse({status: 204, description: 'Delete doctor by id'})
  @ApiResponse({status: 404, description: 'Doctor not found', type: NotFoundSwagger})
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
   await this.doctorsService.softDelete(id);
  }
  @Post('/restore/:id')
  @ApiOperation({summary: 'Restore one doctor, by id'})
  @ApiResponse({status: 200, description: 'Restore one doctor by id, returned successfully',type: DoctorSwagger})
  @ApiResponse({status: 404, description: 'Doctor not found', type: NotFoundSwagger})
  @HttpCode(HttpStatus.OK)
  async restore(@Param('id', new ParseUUIDPipe()) id: string): Promise<Doctor> {
    return await this.doctorsService.restore(id);
  }
}
