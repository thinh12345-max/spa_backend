import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsService } from '../service/bookings.service';
import { BookingsController } from '../controller/bookings.controller';
import { Booking } from '../entity/bookings';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
