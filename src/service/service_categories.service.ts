import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceCategoryDto } from '../dto/service_categories/create_service_categories.dto';
import { UpdateServiceCategoryDto } from '../dto/service_categories/update_service_categories.dto';
import { ServiceCategory } from '../entity/services_categories';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  create(createServiceCategoryDto: CreateServiceCategoryDto) {
    const category = this.serviceCategoryRepository.create(createServiceCategoryDto);
    return this.serviceCategoryRepository.save(category);
  }

  findAll() {
    return this.serviceCategoryRepository.find();
  }

  async findOne(id: number) {
    return this.serviceCategoryRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    await this.serviceCategoryRepository.update(id, updateServiceCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.serviceCategoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Service category not found');
    }

    return { message: 'Deleted successfully' };
  }
}
