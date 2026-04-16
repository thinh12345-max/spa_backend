import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create_users.dto';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}