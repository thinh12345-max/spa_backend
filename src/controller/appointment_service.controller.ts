import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentServicesService } from '../service/appointments_services.service';
import { CreateAppointmentServiceDto } from '../dto/appointment_service/create_appointment_service.dto';
import { UpdateAppointmentServiceDto } from '../dto/appointment_service/update_appointment_service.dto';

@Controller('appointment_services')
export class AppointmentServicesController {
  constructor(private readonly appointmentServicesService: AppointmentServicesService) {}

  @Post()
  create(@Body() createAppointmentServiceDto: CreateAppointmentServiceDto) {
    return this.appointmentServicesService.create(createAppointmentServiceDto);
  }

  @Get()
  findAll() {
    return this.appointmentServicesService.findAll();
  }

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