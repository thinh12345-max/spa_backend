import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entity/payments';
import { CreatePaymentDto } from '../dto/payments/create_payment.dto';
import { UpdatePaymentDto } from '../dto/payments/update_payment.dto';


@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find();
  }

  async findOne(id: number) {
    return this.paymentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    return this.paymentRepository.delete(id);
  }

  findByCustomer(customerId: number) {
    // Temporarily return empty array for testing
    return Promise.resolve([]);
  }
}
