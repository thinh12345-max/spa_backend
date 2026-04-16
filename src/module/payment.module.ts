import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entity/payments';
import { PaymentsService } from '../service/payment.service';
import { PaymentsController } from '../controller/payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
