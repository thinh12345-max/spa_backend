import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingProduct } from '../entity/booking_product';

import { BookingProductsService } from '../service/booking_product.service';
import { BookingProductsController } from '../controller/booking_products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingProduct])],
  controllers: [BookingProductsController],
  providers: [BookingProductsService],
})
export class BookingProductsModule {}