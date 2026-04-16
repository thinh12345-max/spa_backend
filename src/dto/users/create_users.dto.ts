import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username không được để trống' })
  username!: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password!: string;

  @IsIn(['admin', 'staff', 'customer'], {
    message: 'Role phải là admin, staff hoặc customer',
  })
  role_id!: string;
}