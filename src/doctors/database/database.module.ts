import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnections } from './database.connection';

@Module({
  imports: [...DatabaseConnections],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }