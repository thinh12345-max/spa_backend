import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create_schedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
