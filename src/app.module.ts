import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { DatabaseModule } from './doctors/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DoctorsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
