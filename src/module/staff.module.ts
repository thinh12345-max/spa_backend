import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entity/staff';
import { StaffService } from '../service/staff.service';
import { StaffController } from '../controller/staff.controller';
import { User } from '../entity/users';
import { RolesModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, User]), RolesModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
