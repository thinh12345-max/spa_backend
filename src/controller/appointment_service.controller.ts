import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentServicesService } from '../service/appointments_services.service';
import { CreateAppointmentServiceDto } from '../dto/appointment_service/create_appointment_service.dto';
import { UpdateAppointmentServiceDto } from '../dto/appointment_service/update_appointment_service.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('appointment_services')
export class AppointmentServicesController {
  constructor(private readonly appointmentServicesService: AppointmentServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Post()
  create(@Body() createAppointmentServiceDto: CreateAppointmentServiceDto) {
    return this.appointmentServicesService.create(createAppointmentServiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  findAll() {
    return this.appointmentServicesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get(':appointmentId/:serviceId')
  findOne(
    @Param('appointmentId') appointmentId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.appointmentServicesService.findOne(
      +appointmentId,
      +serviceId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':appointmentId/:serviceId')
  update(
    @Param('appointmentId') appointmentId: string,
    @Param('serviceId') serviceId: string,
    @Body() dto: UpdateAppointmentServiceDto,
  ) {
    return this.appointmentServicesService.update(
      +appointmentId,
      +serviceId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Delete(':appointmentId/:serviceId')
  remove(
    @Param('appointmentId') appointmentId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.appointmentServicesService.remove(
      +appointmentId,
      +serviceId,
    );
  }
}