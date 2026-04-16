import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/roles/create_role.dto';
import { UpdateRoleDto } from '../dto/roles/update_role.dto';
import { Role } from '../entity/role';


@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return this.roleRepository.delete(id);
  }
}
