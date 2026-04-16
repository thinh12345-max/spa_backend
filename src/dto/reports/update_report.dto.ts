import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create_report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
