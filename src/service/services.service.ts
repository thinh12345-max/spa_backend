import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/services/create_service.dto';
import { UpdateServiceDto } from '../dto/services/update_service.dto';
import { Service } from '../entity/services';


@Injectable()
export class ServicesService {
  getStaffServices: any;
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.serviceRepository.update(id, updateServiceDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.serviceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Service not found');
    }

    return { message: 'Deleted successfully' };
  }
}
