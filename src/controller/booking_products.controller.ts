import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingProductsService } from '../service/booking_product.service';
import { CreateBookingProductDto } from '../dto/booking_products/create_booking_products.dto';
import { UpdateBookingProductDto } from '../dto/booking_products/update_booking_products.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('booking-products')
export class BookingProductsController {
  constructor(private readonly bookingProductsService: BookingProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Post()
  create(@Body() createBookingProductDto: CreateBookingProductDto) {
    return this.bookingProductsService.create(createBookingProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  findAll() {
    return this.bookingProductsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get(':bookingId/:productId')
  findOne(
  @Param('bookingId') bookingId: number,
  @Param('productId') productId: number,
) {
  return this.bookingProductsService.findOne(bookingId, productId);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':bookingId/:productId')
update(
  @Param('bookingId') bookingId: number,
  @Param('productId') productId: number,
  @Body() dto: UpdateBookingProductDto,
) {
  return this.bookingProductsService.update(bookingId, productId, dto);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Delete(':bookingId/:productId')
  remove(
    @Param('bookingId') bookingId: number,
    @Param('productId') productId: number,
  ) {
    return this.bookingProductsService.remove(bookingId, productId);
  }
}
