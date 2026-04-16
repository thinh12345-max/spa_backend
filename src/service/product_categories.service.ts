import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCategoryDto } from '../dto/product_categories/create_product_categories.dto';
import { UpdateProductCategoryDto } from '../dto/product_categories/update_product_categories.dto';
import { ProductCategory } from '../entity/product_categories';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategory = this.productCategoryRepository.create(createProductCategoryDto);
    return this.productCategoryRepository.save(productCategory);
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  async findOne(id: number) {
    return this.productCategoryRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    await this.productCategoryRepository.update(id, updateProductCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const productCategory = await this.findOne(id);
    return this.productCategoryRepository.delete(id);
  }
}
