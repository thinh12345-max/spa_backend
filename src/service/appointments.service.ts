import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import dayjs from 'dayjs';
import { Staff } from '../entity/staff';
import { Appointment } from '../entity/appointments';
import { CreateAppointmentDto } from '../dto/appointment/create_appointment.dto';
import { UpdateAppointmentDto } from '../dto/appointment/update_appointments.dto';

@Injectable()
export class AppointmentsService {
  async updateStatus(id: number, status: string, user: any) {
    const appointment = await this.findOne(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // ===== ADMIN =====
    if (user.role === 'admin') {
      if (!['confirmed', 'cancelled'].includes(status)) {
        throw new ForbiddenException('Invalid status for admin');
      }
    }

    // ===== STAFF =====
    if (user.role === 'staff') {
      if (appointment.staff?.id !== user.userId) {
        throw new ForbiddenException('Not your appointment');
      }

      if (!['in_progress', 'completed'].includes(status)) {
        throw new ForbiddenException('Invalid status for staff');
      }
    }

    appointment.status = status;
    return this.appointmentRepository.save(appointment);
  }
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}
  // ===================== AVAILABLE TIME =====================
  async getAvailableTime(serviceId: number, date: string): Promise<string[]> {
    const allSlots = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
    ];

    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(date).endOf('day').toDate();

    const appointments = await this.appointmentRepository.find({
      where: {
        appointment_time: Between(start, end),
      },
      relations: ['services', 'services.service'],
    });

    const filtered = appointments.filter((a) =>
      a.services?.some((s) => s.service?.id === serviceId),
    );

    const bookedTimes = filtered.map((a) =>
      dayjs(a.appointment_time).format('HH:mm'),
    );

    return allSlots.filter((slot) => !bookedTimes.includes(slot));
  }

  // ===================== CANCEL =====================
  async cancelByCustomer(id: number, customerId: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!appointment) {
      throw new NotFoundException('Lịch hẹn không tồn tại');
    }

    if (
      !appointment.customer ||
      Number(appointment.customer.id) !== Number(customerId)
    ) {
      throw new ForbiddenException('Không thể hủy lịch hẹn này');
    }

    appointment.status = 'cancelled';
    return this.appointmentRepository.save(appointment);
  }

  // ===================== STAFF =====================
  async getStaffAppointments(
    staffId: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.appointmentRepository.findAndCount({
      where: {
        staff: { id: staffId },
      },
      relations: ['customer', 'services', 'services.service'],
      order: {
        appointment_time: 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ===================== CREATE (FIXED) =====================
  async create(dto: CreateAppointmentDto) {
    if (!dto.staff_id) {
      const staff = await this.staffRepository.find({
        take: 1,
      });

      dto.staff_id = staff[0]?.id;
    }

    // ❗ nếu vẫn null thì báo lỗi
    if (!dto.staff_id) {
      throw new NotFoundException('Không có staff nào trong hệ thống');
    }

    const appointment = this.appointmentRepository.create(dto);

    return this.appointmentRepository.save(appointment);
  }

  // ===================== FIND ALL =====================
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.appointmentRepository.findAndCount({
      relations: ['customer', 'services', 'staff', 'services.service'],
      order: {
        appointment_time: 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ===================== FIND ONE =====================
  findOne(id: number) {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['customer', 'staff', 'services', 'services.service'],
    });
  }

  // ===================== UPDATE =====================
  async update(id: number, dto: UpdateAppointmentDto) {
    await this.appointmentRepository.update(id, dto);
    return this.findOne(id);
  }

  // ===================== DELETE =====================
  async remove(id: number) {
    return this.appointmentRepository.delete(id);
  }

  // ===================== CUSTOMER =====================
  findByCustomer(customerId: number) {
    return this.appointmentRepository.find({
      where: { customer: { id: customerId } },
      relations: ['services', 'services.service', 'staff'],
      order: {
        appointment_time: 'DESC',
      },
    });
  }
}
