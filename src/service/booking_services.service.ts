import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingService } from '../entity/booking_service';
import { CreateBookingServiceDto } from '../dto/booking-services/create_booking_service.dto';
import { UpdateBookingServiceDto } from '../dto/booking-services/update_booking_service.dto';

@Injectable()
export class BookingServicesService {
  constructor(
    @InjectRepository(BookingService)
    private readonly repo: Repository<BookingService>,
  ) {}

  create(dto: CreateBookingServiceDto) {
    const record = this.repo.create(dto);
    return this.repo.save(record);
  }

  findAll() {
    return this.repo.find({
      relations: ['booking', 'service'],
    });
  }

  findOne(booking_id: number, service_id: number) {
    return this.repo.findOne({
      where: { bookings_id: booking_id, services_id: service_id },
      relations: ['booking', 'service'],
    });
  }

  async update(
    booking_id: number,
    service_id: number,
    dto: UpdateBookingServiceDto,
  ) {
    await this.repo.update({ bookings_id: booking_id, services_id: service_id }, dto);
    return this.findOne(booking_id, service_id);
  }

  async remove(booking_id: number, service_id: number) {
    return this.repo.delete({ bookings_id: booking_id, services_id: service_id });
  }
}