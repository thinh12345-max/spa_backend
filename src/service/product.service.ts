import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/products/create_product.dto';
import { UpdateProductDto } from '../dto/products/update_product.dto';
import { Product } from '../entity/product';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
