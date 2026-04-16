import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingProduct } from '../entity/booking_product';
import { CreateBookingProductDto } from '../dto/booking_products/create_booking_products.dto';
import { UpdateBookingProductDto } from '../dto/booking_products/update_booking_products.dto';


@Injectable()
export class BookingProductsService {
  constructor(
    @InjectRepository(BookingProduct)
    private readonly bookingProductRepository: Repository<BookingProduct>,
  ) {}

  create(dto: CreateBookingProductDto) {
    const record = this.bookingProductRepository.create(dto);
    return this.bookingProductRepository.save(record);
  }

  findAll() {
    return this.bookingProductRepository.find({
      relations: ['booking', 'product'],
    });
  }

  findOne(bookings_id: number, products_id: number) {
    return this.bookingProductRepository.findOne({
      where: { bookings_id, products_id },
      relations: ['booking', 'product'],
    });
  }

  async update(
    bookings_id: number,
    products_id: number,
    dto: UpdateBookingProductDto,
  ) {
    await this.bookingProductRepository.update(
      { bookings_id, products_id },
      dto,
    );
    return this.findOne(bookings_id, products_id);
  }

  async remove(bookings_id: number, products_id: number) {
    return this.bookingProductRepository.delete({ bookings_id, products_id });
  }
}