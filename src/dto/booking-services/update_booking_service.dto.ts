import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingServiceDto } from './create_booking_service.dto';

export class UpdateBookingServiceDto extends PartialType(CreateBookingServiceDto) {}
