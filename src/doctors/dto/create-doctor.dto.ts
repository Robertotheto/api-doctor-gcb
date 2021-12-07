import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly crm: number;

  @ApiProperty()
  readonly landline: number;

  @ApiProperty()
  readonly cellphone: number;

  @ApiProperty()
  readonly CEP: number;

  @ApiProperty()
  readonly medicalspecialties: string[];
}
