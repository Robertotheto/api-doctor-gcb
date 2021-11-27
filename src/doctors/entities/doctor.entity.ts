import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 120 })
  name: string;

  @Column('integer')
  crm: number;

  @Column('bigint')
  landline: number;

  @Column('bigint')
  cellphone: number;

  @Column('json')
  CEP: number;

  @Column('json')
  medicalspecialties: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

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
