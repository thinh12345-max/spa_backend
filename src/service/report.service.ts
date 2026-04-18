import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from '../dto/reports/create_report.dto';
import { UpdateReportDto } from '../dto/reports/update_report.dto';
import { Report } from '../entity/report';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async seedReports() {
    const start = new Date('2026-04-01');
    const end = new Date(); 

    const data: Report[] = [];

    let current = new Date(start);

    while (current <= end) {
      const report = this.reportRepository.create({
        report_date: new Date(current),

        total_revenue: Math.floor(Math.random() * 2000000) + 500000,
        service_revenue: Math.floor(Math.random() * 1500000) + 300000,
        product_revenue: Math.floor(Math.random() * 800000) + 100000,

        total_appointments: Math.floor(Math.random() * 20) + 5,
        total_customers: Math.floor(Math.random() * 15) + 3,
      });

      data.push(report);

      current.setDate(current.getDate() + 1);
    }

    await this.reportRepository.save(data);

    return {
      message: 'Seed reports thành công',
      total: data.length,
    };
  }
  // ===============================
  // REVENUE SUMMARY
  // ===============================
  async revenue() {
    const reports = await this.reportRepository.find();

    const totalRevenue = reports.reduce(
      (sum, r) => sum + Number(r.total_revenue || 0),
      0,
    );

    const serviceRevenue = reports.reduce(
      (sum, r) => sum + Number(r.service_revenue || 0),
      0,
    );

    const productRevenue = reports.reduce(
      (sum, r) => sum + Number(r.product_revenue || 0),
      0,
    );

    const totalAppointments = reports.reduce(
      (sum, r) => sum + Number(r.total_appointments || 0),
      0,
    );

    const totalCustomers = reports.reduce(
      (sum, r) => sum + Number(r.total_customers || 0),
      0,
    );

    return {
      totalRevenue,
      serviceRevenue,
      productRevenue,
      totalAppointments,
      totalCustomers,
      reports,
    };
  }

  // ===============================
  // GET DAILY REPORT
  // ===============================
  async getDaily(date: string) {
    let report = await this.reportRepository
      .createQueryBuilder('report')
      .where('DATE(report.report_date) = :date', { date })
      .getOne();

    if (!report) {
      report = this.reportRepository.create({
        report_date: date,
        total_revenue: 1000000,
        service_revenue: 700000,
        product_revenue: 300000,
        total_appointments: 5,
        total_customers: 4,
      });

      await this.reportRepository.save(report);
    }

    return {
      totalRevenue: Number(report.total_revenue || 0),
      serviceRevenue: Number(report.service_revenue || 0),
      productRevenue: Number(report.product_revenue || 0),
      reports: [],
    };
  }

  // ===============================
  // CREATE REPORT
  // ===============================
  create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);

    return this.reportRepository.save(report);
  }

  // ===============================
  // GET ALL REPORTS
  // ===============================
  findAll() {
    return this.reportRepository.find();
  }

  // ===============================
  // GET ONE REPORT
  // ===============================
  async findOne(id: number) {
    return this.reportRepository.findOne({
      where: { id },
    });
  }

  // ===============================
  // UPDATE REPORT
  // ===============================
  async update(id: number, updateReportDto: UpdateReportDto) {
    await this.reportRepository.update(id, updateReportDto);

    return this.findOne(id);
  }

  // ===============================
  // DELETE REPORT
  // ===============================
  async remove(id: number) {
    await this.reportRepository.delete(id);

    return {
      message: 'Report deleted successfully',
    };
  }
}
