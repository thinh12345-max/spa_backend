import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from '../entity/booking_service';
import { BookingServicesService } from '../service/booking_services.service';
import { BookingServicesController } from '../controller/booking_service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingService])],
  controllers: [BookingServicesController],
  providers: [BookingServicesService],
})
export class BookingServicesModule {}
