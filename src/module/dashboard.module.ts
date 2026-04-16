import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Customer } from "../entity/customers";
import { Staff } from "../entity/staff";
import { Appointment } from "../entity/appointments";
import { Payment } from "../entity/payments";

import { DashboardController } from "../controller/dashboard.controller";
import { DashboardService } from "../service/dashbord.service";
import { Report } from "../entity/report";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report,
      Customer,
      Staff,
      Appointment,
      Payment
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}