export class CreateDoctorDto {
  readonly name: string;

  readonly crm: number;

  readonly landline: number;

  readonly cellphone: number;

  readonly cep: number;

  readonly medicalspecialties: string[];
}
