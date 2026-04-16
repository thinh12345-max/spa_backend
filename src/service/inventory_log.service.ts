import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryLog } from '../entity/inventory_logs';
import { CreateInventoryLogDto } from '../dto/inventory_logs/create_inventory_log.dto';
import { UpdateInventoryLogDto } from '../dto/inventory_logs/update_inventory_log.dto';

@Injectable()
export class InventoryLogsService {
  constructor(
    @InjectRepository(InventoryLog)
    private readonly inventoryLogRepository: Repository<InventoryLog>,
  ) {}

  async create(createInventoryLogDto: CreateInventoryLogDto) {
    const inventoryLog = this.inventoryLogRepository.create(createInventoryLogDto);
    return this.inventoryLogRepository.save(inventoryLog);
  }

  findAll() {
    return this.inventoryLogRepository.find();
  }

  async findOne(id: number) {
    return this.inventoryLogRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateInventoryLogDto: UpdateInventoryLogDto) {
    await this.inventoryLogRepository.update(id, updateInventoryLogDto);
    return this.findOne(id);
  }

  async delete(id: number) {
    const inventoryLog = await this.findOne(id);
    return this.inventoryLogRepository.delete(id);
  }
}