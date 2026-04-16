import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLogDto } from './create_inventory_log.dto';

export class UpdateInventoryLogDto extends PartialType(CreateInventoryLogDto) {}
