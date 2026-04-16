import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entity/appointments';
import { AppointmentsController } from '../controller/appointments.controller';
import { AppointmentsService } from '../service/appointments.service';
import { ServicesModule } from '../module/services.module';
import { AppointmentServicesModule } from '../module/appointment_service.module';
import { User } from '../entity/users'; 
import { Staff } from '../entity/staff';
import { Service } from '../entity/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    ServicesModule,
    AppointmentServicesModule,
    User,
    Staff,
    Service,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
