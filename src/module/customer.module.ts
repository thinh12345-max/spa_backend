import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '../service/customers.service';
import { CustomersController } from '../controller/customers.controller';
import { Customer } from '../entity/customers';
import { RolesModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), RolesModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
