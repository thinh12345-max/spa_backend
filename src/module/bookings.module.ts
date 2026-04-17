import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsService } from '../service/bookings.service';
import { BookingsController } from '../controller/bookings.controller';
import { Booking } from '../entity/bookings';
import { Customer } from '../entity/customers';
import { Staff } from '../entity/staff';
import { Payment } from '../entity/payments';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Customer, Staff, Payment])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
