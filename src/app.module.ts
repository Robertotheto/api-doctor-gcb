import { Module } from '@nestjs/common';
import { DoctorsModule } from './doctors/doctors.module';
import { DatabaseModule } from './doctors/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DoctorsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
