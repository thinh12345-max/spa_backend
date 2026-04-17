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
  Query,
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    return this.customersService.getDashboard(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('me')
  async getProfile(@Req() req: any) {
    if (!req.user?.userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.customersService.findOne(Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Put('me')
  async updateProfile(
    @Req() req: any,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(Number(req.user.userId), updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(@Query() query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    return this.customersService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(Number(id), updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.remove(Number(id));
  }
}