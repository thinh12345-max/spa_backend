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
  NotFoundException,
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
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: any,
  ) {
    const dto: CreateAppointmentDto = {
      ...createAppointmentDto,
      customer_id: req.user.userId,
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: any,
  ) {
    return this.appointmentsService.updateStatus(+id, status, req.user);
  }

  // =========================
  // CUSTOMER - XEM LỊCH HẸN CỦA TÔI
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('my')
  findMy(@Req() req: any) {
    return this.appointmentsService.findByCustomer(req.user.userId);
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
  async findAll(@Query() query: any, @Req() req: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    // Nếu là staff, chỉ trả về appointments của chính mình
    if (req.user.role === 'staff') {
      return this.appointmentsService.getStaffAppointments(
        req.user.userId,
        page,
        limit,
      );
    }
    // Admin xem tất cả
    return this.appointmentsService.findAll(page, limit);
  }

  // =========================
  // ADMIN / STAFF - XEM CHI TIẾT
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff', 'admin')
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const appointment = await this.appointmentsService.findOne(+id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Kiểm tra quyền: staff chỉ xem được appointment của mình
    if (
      req.user.role === 'staff' &&
      appointment.staff?.id !== req.user.userId
    ) {
      throw new ForbiddenException('You can only view your own appointments');
    }

    return appointment;
  }

  // =========================
  // ADMIN / STAFF - CẬP NHẬT
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff', 'admin')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Req() req: any,
  ) {
    const appointment = await this.appointmentsService.findOne(+id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Kiểm tra quyền: staff chỉ sửa được appointment của mình
    if (
      req.user.role === 'staff' &&
      appointment.staff?.id !== req.user.userId
    ) {
      throw new ForbiddenException('You can only update your own appointments');
    }

    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  // =========================
  // CUSTOMER - HỦY LỊCH HẸN CỦA CHÍNH MÌNH
  // =========================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.appointmentsService.cancelByCustomer(+id, req.user.userId);
  }
}
