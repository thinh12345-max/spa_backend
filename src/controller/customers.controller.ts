import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CreateCustomerDto } from '../dto/customers/create_customers.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { UpdateCustomerDto } from '../dto/customers/update_customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {
    console.log('CustomersController loaded');
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    return this.customersService.getDashboard(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('me')
  async getProfile(@Req() req: any) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.customersService.findOne(Number(req.user.sub));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Put('me')
  async updateProfile(
    @Req() req: any,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(Number(req.user.sub), updateCustomerDto);
  }

  @Get()
  async findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(Number(id), updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.remove(Number(id));
  }
}