import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { StaffService } from '../service/staff.service';
import { CreateStaffDto } from '../dto/staff/create_staff.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { UpdateStaffDto } from '../dto/staff/update_staff.dto';
import { AppointmentsService } from '../service/appointments.service';
import { UsersService } from '../service/users.service';
import { ServicesService } from '../service/services.service';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly appointmentService: AppointmentsService,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
  ) {}

  // ===================== ADMIN ONLY =====================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(@Query() query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    return this.staffService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.staffService.remove(Number(id));
  }

  // ===================== ADMIN & STAFF (with check) =====================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get(':id') 
  async findOne(@Param('id', ParseIntPipe) id: string, @Req() req: any) {
    const staff = await this.staffService.findOne(Number(id));

    // Nếu là staff, chỉ được xem profile của chính mình
    if (req.user.role === 'staff' && staff.user?.id !== req.user.userId) {
      throw new ForbiddenException('You can only view your own staff profile');
    }

    return staff;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStaffDto: UpdateStaffDto,
    @Req() req: any,
  ) {
    const staff = await this.staffService.findOne(Number(id));

    // Nếu là staff, chỉ được sửa profile của chính mình
    if (req.user.role === 'staff' && staff.user?.id !== req.user.userId) {
      throw new ForbiddenException('You can only update your own staff profile');
    }

    return this.staffService.update(Number(id), updateStaffDto);
  }

  // ===================== STAFF ONLY =====================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('schedule')
  getSchedule(@Req() req) {
    return this.appointmentService.getStaffAppointments(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('appointments')
  getAppointments(@Req() req) {
    return this.appointmentService.getStaffAppointments(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('services')
  getServices(@Req() req) {
    return this.servicesService.getStaffServices(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('customers')
  getCustomers(@Req() req) {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('my-bookings')
  findMyBookings(@Req() req) {
    return this.appointmentService.getStaffAppointments(req.user.userId);
  }
}
