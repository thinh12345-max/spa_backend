import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entity/customers';
import { CreateCustomerDto } from '../dto/customers/create_customers.dto';
import { UpdateCustomerDto } from '../dto/customers/update_customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(id, updateCustomerDto);
    await this.findOne(id); 
  }

  async getDashboard(customerId: number) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['appointments'],
    });
    return customer
      ? {
      totalAppointments: customer.appointments?.length || 0,
    }
      : { totalAppointments: 0 };
  }

  async remove(id: number) {
    const result = await this.customerRepository.delete(id);
    return result.affected
      ? { message: `Customer #${id} deleted successfully` }
      : { message: `Customer #${id} not found` };
  }
}