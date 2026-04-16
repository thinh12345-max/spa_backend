import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from '../service/payment.service';
import { CreatePaymentDto } from '../dto/payments/create_payment.dto';
import { UpdatePaymentDto } from '../dto/payments/update_payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get('my')
  findMy(@Req() req) {
    return this.paymentsService.findByCustomer(req.user?.sub || 1); // Default to user ID 1 for testing
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }
}
