import { IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  password!: string;
}