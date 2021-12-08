
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min
} from "class-validator";

export class UpdateDoctorDto  {
  @IsString()
  @IsNotEmpty({message: 'Please add the name of the doctor.'})
  @MaxLength(120,{message:"The doctor's name must be up to 120 characters"})
  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsNotEmpty({message: 'Please add the crm of the doctor.'})
  @IsNumber()
  @Min(1000000,{message: "The doctor's crm must be min to 7 number"})
  @Max(9999999,{message: "The doctor's crm must be max to 7 number"})
  @IsOptional()
  @ApiPropertyOptional()
  readonly crm?: number;

  @IsNotEmpty({message: 'Please add the landline of the doctor.'})
  @IsNumber()
  @Min(10000000000,{message: "The doctor's landline must be min to 11 number"})
  @Max(99999999999,{message: "The doctor's landline must be max to 11 number"})
  @IsOptional()
  @ApiPropertyOptional()
  readonly landline?: number;

  @IsNotEmpty({message: 'Please add the cellphone of the doctor.'})
  @IsNumber()
  @Min(10000000000,{message: "The doctor's cellphone must be min to 11 number"})
  @Max(99999999999,{message: "The doctor's cellphone must be max to 11 number"})
  @IsOptional()
  @ApiPropertyOptional()
  readonly cellphone?: number;

  @IsNotEmpty({message: 'Please add the Cep of the doctor.'})
  @IsNumber()
  @Min(10000000,{message: "The doctor's cep must be up to 8 number"})
  @Max(99999999,{message: "The doctor's cep must be up to 8 number"})
  @IsOptional()
  @ApiPropertyOptional()
  CEP?: number;

  @IsArray({message: "Please add the medical specialties of the doctor."})
  @ArrayMinSize(2,{message: "The doctor's medical specialties must be min to 2 specialties"})
  @IsOptional()
  @ApiPropertyOptional()
  readonly medicalspecialties?: string[];
}
