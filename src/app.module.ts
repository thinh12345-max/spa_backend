import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { UsersModule } from './module/users.module';
import { RolesModule } from './module/role.module';
import { ServicesModule } from './module/services.module';
import { AppointmentsModule } from './module/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppointmentServicesModule } from './module/appointment_service.module';
import { CustomersModule } from './module/customer.module';
import { StaffModule } from './module/staff.module';
import { DashboardModule } from './module/dashboard.module';
import { BookingsModule } from './module/bookings.module';
import { PaymentsModule } from './module/payment.module';
import { ProductsModule } from './module/product.module';
import { ProductCategoriesModule } from './module/product_categories.module';
import { ServiceCategoriesModule } from './module/service_categories.module';
import { ReportsModule } from './module/report.module';
import { SchedulesModule } from './module/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // dev only
      entities: [__dirname + '/entity/*{.ts,.js}'],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    ServicesModule,
    AppointmentServicesModule,
    AppointmentsModule,
    CustomersModule,
    StaffModule,
    DashboardModule,
    BookingsModule,
    PaymentsModule,
    ProductsModule,
    ProductCategoriesModule,
    ServiceCategoriesModule,
    ReportsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
