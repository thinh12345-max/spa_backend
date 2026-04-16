import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategory } from '../entity/services_categories';
import { ServicesService } from '../service/service_categories.service';
import { ServiceCategoriesController } from '../controller/service_categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory])],
  controllers: [ServiceCategoriesController],
  providers: [ServicesService],
})
export class ServiceCategoriesModule {}
