import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingProductDto } from './create_booking_products.dto';
export class UpdateBookingProductDto extends PartialType(CreateBookingProductDto) {}
