import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { CreateScheduleDto } from '../dto/schedules/create_schedule.dto';
import { UpdateScheduleDto } from '../dto/schedules/update_schedule.dto';
import { Schedule } from '../entity/schedule';


@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  findAll() {
    return this.scheduleRepository.find();
  }

  async findOne(id: number) {
    return this.scheduleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.scheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    return this.scheduleRepository.delete(id);
  }
}
