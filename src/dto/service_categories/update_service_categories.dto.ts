import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceCategoryDto } from './create_service_categories.dto';

export class UpdateServiceCategoryDto extends PartialType(CreateServiceCategoryDto) {}
