import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductCategoryDto } from '../dto/product_categories/create_product_categories.dto';
import { UpdateProductCategoryDto } from '../dto/product_categories/update_product_categories.dto';
import { ProductCategoriesService } from '../service/product_categories.service';


@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoriesService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoriesService.remove(+id);
  }
}
