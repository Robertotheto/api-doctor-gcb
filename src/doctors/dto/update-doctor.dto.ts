
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateDoctorDto  {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly crm?: number;

  @ApiPropertyOptional()
  readonly landline?: number;

  @ApiPropertyOptional()
  readonly cellphone?: number;

  @ApiPropertyOptional()
  CEP?: number;

  @ApiPropertyOptional()
  readonly medicalspecialties?: string[];
}
