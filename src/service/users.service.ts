import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entity/role';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/users/create_users.dto';
import { UpdateUserDto } from '../dto/users/update_users.dto';
import { User } from '../entity/users';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/auth/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // ================= REGISTER =================
  async register(data: RegisterDto) {
    // ✅ Check trùng username hoặc email
    const existingUser = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser) {
      throw new BadRequestException('Username hoặc email đã tồn tại');
    }

    // ✅ Lấy role customer
    const role = await this.roleRepository.findOne({
      where: { name: 'customer' },
    });

    if (!role) {
      throw new NotFoundException('Role customer không tồn tại');
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Dùng create + save (chuẩn)
    const user = this.userRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: role, // 🔥 dùng relation
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'Đăng ký thành công',
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
      },
    };
  }

  // ================= FIND BY USERNAME =================
  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  // ================= CREATE =================
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new BadRequestException('Username hoặc email đã tồn tại');
    }

    const role = await this.roleRepository.findOne({
      where: { name: createUserDto.role_id },
    });

    if (!role) {
      throw new NotFoundException('Role không tồn tại');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const result = await this.userRepository.insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role_id: role.id,
    });

    return {
      message: 'Tạo tài khoản thành công',
      user: {
        id: result.identifiers[0]?.id,
        username: createUserDto.username,
        email: createUserDto.email,
        role: createUserDto.role_id,
      },
    };
  }

  // ================= FIND ALL =================
  findAll() {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  // ================= FIND ONE =================
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // ================= UPDATE =================
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Nếu update role
    if ((updateUserDto as any).role) {
      const role = await this.roleRepository.findOne({
        where: { name: (updateUserDto as any).role },
      });

      if (!role) {
        throw new NotFoundException('Role không tồn tại');
      }

      user.role_id = role.id;
      delete (updateUserDto as any).role;
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // ================= DELETE =================
  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);

    return { message: 'Deleted successfully' };
  }
}
