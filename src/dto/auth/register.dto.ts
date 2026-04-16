import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username không được để trống' })
  username!: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password!: string;

}