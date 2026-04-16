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
  Query,
} from '@nestjs/common';
import { AppointmentsService } from '../service/appointments.service';
import { CreateAppointmentDto } from '../dto/appointment/create_appointment.dto';
import { UpdateAppointmentDto } from '../dto/appointment/update_appointments.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import dayjs from 'dayjs';
import { AppointmentServicesService } from '../service/appointments_services.service';
import { ServicesService } from '../service/services.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly appointmentServicesService: AppointmentServicesService,
    private readonly servicesService: ServicesService,
  ) {}

  // =========================
  // CUSTOMER - TẠO LỊCH HẸN
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('customer')
@Post()
async create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req) {
  const dto: CreateAppointmentDto = {
    ...createAppointmentDto,
    customer_id: req.user.sub,
  };

  if (createAppointmentDto.date && createAppointmentDto.time) {
    dto.appointment_time = dayjs(
      `${createAppointmentDto.date} ${createAppointmentDto.time}`,
    ).toDate();
  }

  const appointment = await this.appointmentsService.create(dto);

  if (createAppointmentDto.service_id) {
    const service = await this.servicesService.findOne(
      createAppointmentDto.service_id,
    );

    if (service) {
      await this.appointmentServicesService.create({
        appointment_id: appointment.id,
        service_id: service.id,
        price_at_time: Number(service.price),
        quantity: 1,
      });
    }
  }

  return {
    message: 'Tạo lịch hẹn thành công',
    data: appointment,
  };
}

  // =========================
  // CUSTOMER - XEM LỊCH HẸN CỦA TÔI
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('my')
  findMy(@Req() req) {
    return this.appointmentsService.findByCustomer(req.user.sub);
  }

  @Get('available-time')
  getAvailableTime(
    @Query('service_id') serviceId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentsService.getAvailableTime(Number(serviceId), date);
  }

  // =========================
  // ADMIN / STAFF - XEM TẤT CẢ
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff', 'admin')
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  // =========================
  // ADMIN / STAFF - XEM CHI TIẾT
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( 'staff')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  // =========================
  // ADMIN / STAFF - CẬP NHẬT
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( 'staff')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  // =========================
  // CUSTOMER - HỦY LỊCH HẸN CỦA CHÍNH MÌNH
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.appointmentsService.cancelByCustomer(+id, req.user.sub);
  }
}