import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create_service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
