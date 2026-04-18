import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 🔐 validate user
  async validateUser(identifier: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    return user;
  }

  // 🔑 LOGIN
  async login(loginDto: LoginDto) {
    const identifier = loginDto.username || loginDto.email;

    // ❗ chặn trường hợp không gửi gì
    if (!identifier) {
      throw new BadRequestException('Phải nhập username hoặc email');
    }

    const user = await this.validateUser(identifier, loginDto.password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role.name,
      },
    };
  }

  // 👤 API ME
  async getMe(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      isAdmin: user.role.name === 'admin',
    };
  }
}