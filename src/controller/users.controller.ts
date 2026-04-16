import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { CreateUserDto } from '../dto/users/create_users.dto';
import { UpdateUserDto } from '../dto/users/update_users.dto';
import { UsersService } from '../service/users.service';
import { RegisterDto } from '../dto/auth/register.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  // REGISTER
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.usersService.register(data);
  }

  // ADMIN - GET ALL USERS
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // CREATE USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}