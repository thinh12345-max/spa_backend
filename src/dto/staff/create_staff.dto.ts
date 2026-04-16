import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStaffDto {
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  users_id?: number;

  @IsString()
  @IsNotEmpty({ message: 'Full name không được để trống' })
  full_name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  salary?: number;

  @IsOptional()
  @IsString()
  status?: string;
}