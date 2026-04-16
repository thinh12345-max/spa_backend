import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create_appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
