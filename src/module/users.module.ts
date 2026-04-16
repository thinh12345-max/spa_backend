import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/users';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { Role } from '../entity/role';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
