import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingServicesService } from '../service/booking_services.service';
import { CreateBookingServiceDto } from '../dto/booking-services/create_booking_service.dto';
import { UpdateBookingServiceDto } from '../dto/booking-services/update_booking_service.dto';

@Controller('booking-services')
export class BookingServicesController {
  constructor(private readonly bookingServicesService: BookingServicesService) {}

  @Post()
  create(@Body() createBookingServiceDto: CreateBookingServiceDto) {
    return this.bookingServicesService.create(createBookingServiceDto);
  }

  @Get()
  findAll() {
    return this.bookingServicesService.findAll();
  }

  @Get(':bookingId/:serviceId')
findOne(
  @Param('bookingId') bookingId: string,
  @Param('serviceId') serviceId: string,
) {
  return this.bookingServicesService.findOne(
    +bookingId,
    +serviceId,
  );
}

 @Patch(':bookingId/:serviceId')
update(
  @Param('bookingId') bookingId: string,
  @Param('serviceId') serviceId: string,
  @Body() dto: UpdateBookingServiceDto,
) {
  return this.bookingServicesService.update(
    +bookingId,
    +serviceId,
    dto,
  );
}

@Delete(':bookingId/:serviceId')
remove(
  @Param('bookingId') bookingId: string,
  @Param('serviceId') serviceId: string,
) {
  return this.bookingServicesService.remove(
    +bookingId,
    +serviceId,
  );
 }
}