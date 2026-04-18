import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateScheduleDto } from '../dto/schedules/create_schedule.dto';
import { UpdateScheduleDto } from '../dto/schedules/update_schedule.dto';
import { SchedulesService } from '../service/schedule.service';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('staff')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('staff')
  @Get('schedule')
  getSchedule(@Req() req) {
    return this.schedulesService.getByStaff(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  findAll(@Req() req: any) {
    // TODO: If staff, filter by staff_id. For now assume service handles it.
    return this.schedulesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.schedulesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Req() req: any,
  ) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.schedulesService.remove(+id);
  }
}
