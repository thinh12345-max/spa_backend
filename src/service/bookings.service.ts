import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entity/bookings';
import { CreateBookingDto } from '../dto/bookings/create_booking.dto';
import { UpdateBookingDto } from '../dto/bookings/update_booking.dto';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(dto: CreateBookingDto) {
    const booking = this.bookingRepository.create({
      ...dto,
      customer: { id: dto.customers_id },
      staff: { id: dto.staffs_id },
    });
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find({
      relations: ['customer', 'staff', 'payments'],
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['customer', 'staff', 'payments'],
    });
  }

  async update(id: number, dto: UpdateBookingDto) {
    await this.bookingRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}