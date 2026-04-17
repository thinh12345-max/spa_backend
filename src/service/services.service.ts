import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/services/create_service.dto';
import { UpdateServiceDto } from '../dto/services/update_service.dto';
import { Service } from '../entity/services';
import { AppointmentService as AppointmentServiceEntity } from '../entity/appointments_service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(AppointmentServiceEntity)
    private readonly appointmentServiceRepository: Repository<AppointmentServiceEntity>,
  ) {}
  create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.serviceRepository.update(id, updateServiceDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.serviceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Service not found');
    }

    return { message: 'Deleted successfully' };
  }

  // ===================== STAFF =====================
  /**
   * Get all distinct services offered by a specific staff member
   * through their appointments.
   */
  async getStaffServices(staffId: number): Promise<Service[]> {
    // Find all appointment_services for appointments of this staff
    const appointmentServices = await this.appointmentServiceRepository.find({
      where: { appointment: { staff: {id: staffId } } },
      relations: ['service'],
    });

    // Extract unique services
    const servicesMap = new Map<number, Service>();
    appointmentServices.forEach(as => {
      if (as.service) {
        servicesMap.set(as.service.id, as.service);
      }
    });

    return Array.from(servicesMap.values());
  }
}
