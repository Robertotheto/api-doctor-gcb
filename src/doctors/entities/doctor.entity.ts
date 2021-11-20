import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Correios } from '../interfaces/interface.correios';
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
  CEP: Promise<Correios>;

  @Column('json')
  medicalspecialties: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
