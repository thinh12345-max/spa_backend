import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product';
import { ProductsController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
