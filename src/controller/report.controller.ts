import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ReportsService } from '../service/report.service';
import { CreateReportDto } from '../dto/reports/create_report.dto';
import { UpdateReportDto } from '../dto/reports/update_report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('daily')
  daily(@Query('date') date: string) {
    return this.reportsService.getDaily(date);
  }

  @Get('revenue')
  revenue() {
    return this.reportsService.revenue();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.remove(+id);
  }
}
