import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users';
import { CreateStaffDto } from '../dto/staff/create_staff.dto';
import { UpdateStaffDto } from '../dto/staff/update_staff.dto';
import { Staff } from '../entity/staff';


@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ================= CREATE =================
  async create(createStaffDto: CreateStaffDto) {
    const { users_id, ...staffData } = createStaffDto;

let user: User | null = null;

    if (users_id) {
      user = await this.userRepository.findOne({
        where: { id: users_id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    const staff = this.staffRepository.create({
      ...staffData,
      user: user || undefined,
    });

    return this.staffRepository.save(staff);
  }

  // ================= FIND ALL =================
  findAll() {
    return this.staffRepository.find({
      relations: ['user'],
    });
  }

  // ================= FIND ONE =================
  async findOne(id: number) {
    const staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    return staff;
  }

  // ================= UPDATE =================
  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.findOne(id);

    const { users_id, ...staffData } = updateStaffDto;

    if (users_id !== undefined) {
      const user = await this.userRepository.findOne({
        where: { id: users_id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      staff.user = user;
    }

    Object.assign(staff, staffData);

    return this.staffRepository.save(staff);
  }

  // ================= DELETE =================
  async remove(id: number) {
    const staff = await this.findOne(id);
    await this.staffRepository.remove(staff);

    return { message: 'Deleted successfully' };
  }
}