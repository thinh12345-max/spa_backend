import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role';

import { RolesService } from '../service/roles.service';
import { RolesController } from '../controller/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
