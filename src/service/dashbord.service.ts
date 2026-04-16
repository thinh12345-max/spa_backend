import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "../entity/report";

@Injectable()
export class DashboardService {

  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  async getDashboardData(period: string = "week") {

    const now = new Date();
    let startDate = new Date();

    if (period === "week") {
      startDate.setDate(now.getDate() - 7);
    }

    if (period === "month") {
      startDate.setMonth(now.getMonth() - 1);
    }

    if (period === "year") {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const reports = await this.reportRepo
      .createQueryBuilder("r")
      .where("r.report_date >= :startDate", { startDate })
      .orderBy("r.report_date", "ASC")
      .getMany();

    const totalRevenue = reports.reduce(
      (sum, r) => sum + Number(r.total_revenue),
      0
    );

    const totalAppointments = reports.reduce(
      (sum, r) => sum + r.total_appointments,
      0
    );

    const totalCustomers = reports.reduce(
      (sum, r) => sum + r.total_customers,
      0
    );

    return {
      summary: {
        totalRevenue,
        totalAppointments,
        totalCustomers
      },
      chart: reports.map(r => ({
        date: r.report_date,
        revenue: Number(r.total_revenue)
      }))
    };
  }

}