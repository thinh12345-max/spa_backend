import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { DashboardService } from "../service/dashbord.service";
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller("dashboard")
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  @Get()
  getDashboard(@Query("period") period: string) {
    return this.dashboardService.getDashboardData(period);
  }
}
