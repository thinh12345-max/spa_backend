import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from '../entity/appointments_service'; 
import { AppointmentServicesController } from '../controller/appointment_service.controller';
import { AppointmentServicesService } from '../service/appointments_services.service';


@Module({
  imports: [TypeOrmModule.forFeature([AppointmentService])],
  controllers: [AppointmentServicesController],
  providers: [AppointmentServicesService],
  exports: [AppointmentServicesService],
})
export class AppointmentServicesModule {}
