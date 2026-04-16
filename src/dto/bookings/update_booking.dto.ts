import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create_booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
