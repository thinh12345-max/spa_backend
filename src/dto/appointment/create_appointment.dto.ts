import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAppointmentDto {
  @IsOptional()
  @IsNumber({}, { message: 'Customer ID must be a number' })
  @Type(() => Number)
  customer_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Staff ID must be a number' })
  @Type(() => Number)
  staff_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Service ID must be a number' })
  @Type(() => Number)
  service_id?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date?: string;

  @IsOptional()
  @IsString({ message: 'Time must be a string' })
  time?: string;

  @IsOptional()
  @Type(() => Date)
  appointment_time?: Date;

  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled'], {
    message: 'Status must be one of: pending, confirmed, completed, cancelled',
  })
  status?: string;

  @IsOptional()
  @IsString()
  note?: string;
}