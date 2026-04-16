import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLog } from '../entity/inventory_logs';
import { InventoryLogsService } from '../service/inventory_log.service';
import { InventoryLogsController } from '../controller/inventory_logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLog])],
  controllers: [InventoryLogsController],
  providers: [InventoryLogsService],
  exports: [InventoryLogsService],
})
export class InventoryLogsModule {}
