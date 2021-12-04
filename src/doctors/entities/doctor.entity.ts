import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuid } from 'uuid';
import { ApiProperty } from "@nestjs/swagger";

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar', { length: 120 })
  @ApiProperty()
  name: string;

  @Column('integer')
  @ApiProperty()
  crm: number;

  @Column('bigint')
  @ApiProperty()
  landline: number;

  @Column('bigint')
  @ApiProperty()
  cellphone: number;

  @Column('json')
  @ApiProperty()
  CEP: number;

  @Column('json')
  @ApiProperty()
  medicalspecialties: string[];

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  update_at: Date;

  @DeleteDateColumn()
  @ApiProperty()
  delete_at: Date;

  constructor(doctor?: Partial<Doctor>) {
    this.id = doctor?.id;
    this.name = doctor?.name;
    this.crm = doctor?.crm;
    this.landline = doctor?.landline;
    this.cellphone = doctor?.cellphone;
    this.CEP = doctor?.CEP;
    this.medicalspecialties = doctor?.medicalspecialties;
    if (!this.id) {
      this.id = uuid();
    }
  }
}
