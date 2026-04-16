import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '../service/customers.service';
import { CustomersController } from '../controller/customers.controller';
import { Customer } from '../entity/customers';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
