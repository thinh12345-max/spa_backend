import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingProductsService } from '../service/booking_product.service';
import { CreateBookingProductDto } from '../dto/booking_products/create_booking_products.dto';
import { UpdateBookingProductDto } from '../dto/booking_products/update_booking_products.dto';

@Controller('booking-products')
export class BookingProductsController {
  constructor(private readonly bookingProductsService: BookingProductsService) {}

  @Post()
  create(@Body() createBookingProductDto: CreateBookingProductDto) {
    return this.bookingProductsService.create(createBookingProductDto);
  }

  @Get()
  findAll() {
    return this.bookingProductsService.findAll();
  }

  @Get(':bookingId/:productId')
  findOne(
  @Param('bookingId') bookingId: number,
  @Param('productId') productId: number,
) {
  return this.bookingProductsService.findOne(bookingId, productId);
}

  @Patch(':bookingId/:productId')
update(
  @Param('bookingId') bookingId: number,
  @Param('productId') productId: number,
  @Body() dto: UpdateBookingProductDto,
) {
  return this.bookingProductsService.update(bookingId, productId, dto);
}

  @Delete(':bookingId/:productId')
  remove(
    @Param('bookingId') bookingId: number,
    @Param('productId') productId: number,
  ) {
    return this.bookingProductsService.remove(bookingId, productId);
  }
}
