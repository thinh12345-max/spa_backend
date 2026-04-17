import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entity/staff';
import { StaffService } from '../service/staff.service';
import { StaffController } from '../controller/staff.controller';
import { User } from '../entity/users';
import { RolesModule } from './role.module';
import { AppointmentsModule } from './appointment.module';
import { ServicesModule } from './services.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, User]),
    RolesModule,
    AppointmentsModule,
    ServicesModule,
    UsersModule,
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
