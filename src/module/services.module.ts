import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from '../controller/services.controller';
import { Service } from '../entity/services';
import { ServiceCategory } from '../entity/services_categories';
import { ServicesService } from '../service/services.service';
import { AppointmentService } from '../entity/appointments_service'; // 👈 thêm


@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceCategory, AppointmentService ])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
