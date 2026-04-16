import { Controller, Get, Query } from "@nestjs/common";
import { DashboardService } from "../service/dashbord.service";

@Controller("dashboard")
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Query("period") period: string) {
    return this.dashboardService.getDashboardData(period);
  }

}