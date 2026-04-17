import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingServicesService } from '../service/booking_services.service';
import { CreateBookingServiceDto } from '../dto/booking-services/create_booking_service.dto';
import { UpdateBookingServiceDto } from '../dto/booking-services/update_booking_service.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('booking-services')
export class BookingServicesController {
  constructor(private readonly bookingServicesService: BookingServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Post()
  create(@Body() createBookingServiceDto: CreateBookingServiceDto) {
    return this.bookingServicesService.create(createBookingServiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  findAll() {
    return this.bookingServicesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
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