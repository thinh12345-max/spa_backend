import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
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

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('sai username hoặc password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('sai username hoặc password');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role.name,
      },
    };
  }

  // 🔥 API ME
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
