import { Injectable } from '@nestjs/common';
import { CreateAppointmentServiceDto } from '../dto/appointment_service/create_appointment_service.dto';
import { UpdateAppointmentServiceDto } from '../dto/appointment_service/update_appointment_service.dto';
import { AppointmentService } from '../entity/appointments_service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentServicesService {
  constructor(
    @InjectRepository(AppointmentService)
    private readonly appointmentServiceRepository: Repository<AppointmentService>,
  ) {}

  async create(dto: CreateAppointmentServiceDto) {
    const record = this.appointmentServiceRepository.create({
      appointment: { id: dto.appointment_id },
      service: { id: dto.service_id },
      price_at_time: dto.price_at_time,
      quantity: dto.quantity,
    });

    return this.appointmentServiceRepository.save(record);
  }

  findAll() {
    return this.appointmentServiceRepository.find({
      relations: ['appointment', 'service'],
    });
  }

  async findOne(appointment_id: number, service_id: number) {
    return this.appointmentServiceRepository.findOne({
      where: {
        appointment: { id: appointment_id },
        service: { id: service_id },
      },
      relations: ['appointment', 'service'],
    });
  }

  async update(
    appointment_id: number,
    service_id: number,
    dto: UpdateAppointmentServiceDto,
  ) {
    await this.appointmentServiceRepository.update(
      {
        appointment: { id: appointment_id },
        service: { id: service_id },
      },
      dto,
    );

    return this.findOne(appointment_id, service_id);
  }

  async remove(appointment_id: number, service_id: number) {
    return this.appointmentServiceRepository.delete({
      appointment: { id: appointment_id },
      service: { id: service_id },
    });
  }
}
