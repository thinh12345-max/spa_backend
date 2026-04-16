import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { CreateStaffDto } from '../dto/staff/create_staff.dto';
import { UpdateStaffDto } from '../dto/staff/update_staff.dto';
import { StaffService } from '../service/staff.service';
import { AppointmentsService } from '../service/appointments.service';
import { UsersService } from '../service/users.service';
import { ServicesService } from '../service/services.service';


@Controller('staff')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('STAFF')
export class StaffController {
  bookingsService: any;
  constructor(
    private readonly staffService: StaffService,
    private readonly appointmentService: AppointmentsService,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get('schedule')
  getSchedule(@Req() req) {
    return this.appointmentService.getStaffAppointments(req.user.sub);
  }

  @Get('appointments')
  getAppointments(@Req() req) {
    return this.appointmentService.getStaffAppointments(req.user.sub);
  }

  @Get('services')
  getServices(@Req() req) {
    return this.servicesService.getStaffServices(req.user.sub);
  }

  @Get('customers')
  getCustomers(@Req() req) {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('STAFF')
  @Get('my-bookings')
  findMyBookings(@Req() req) {  
  return this.appointmentService.getStaffAppointments(req.user.sub);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
