import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateServiceCategoryDto } from '../dto/service_categories/create_service_categories.dto';
import { UpdateServiceCategoryDto } from '../dto/service_categories/update_service_categories.dto';
import { ServicesService } from '../service/service_categories.service';


@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(private readonly serviceCategoriesService: ServicesService) {}

  @Post()
  create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return this.serviceCategoriesService.create(createServiceCategoryDto);
  }

  @Get()
  findAll() {
    return this.serviceCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return this.serviceCategoriesService.update(+id, updateServiceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCategoriesService.remove(+id);
  }
}
