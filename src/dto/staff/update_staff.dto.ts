import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create_staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
