import {  ApiPropertyOptional } from "@nestjs/swagger";

export class FindDoctorDTO {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly crm: number;

  @ApiPropertyOptional()
  readonly landline: number;

  @ApiPropertyOptional()
  readonly cellphone: number;

  @ApiPropertyOptional()
  readonly CEP: number;

  @ApiPropertyOptional()
  readonly medicalspecialties: string[];
}
