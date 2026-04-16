import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../entity/schedule';
import { SchedulesService } from '../service/schedule.service';
import { SchedulesController } from '../controller/schedules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
