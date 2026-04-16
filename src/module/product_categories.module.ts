import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../entity/product_categories';
import { ProductCategoriesService } from '../service/product_categories.service';
import { ProductCategoriesController } from '../controller/product_categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
