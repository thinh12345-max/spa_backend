import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entity/report';
import { ReportsController } from '../controller/report.controller';
import { ReportsService } from '../service/report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
