import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto } from './create_product_categories.dto';

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {}
