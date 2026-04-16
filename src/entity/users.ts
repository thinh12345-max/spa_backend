import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../entity/role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Cột khóa ngoại thật trong DB
  @Column()
  role_id!: number;

  // Quan hệ tới bảng roles
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    cascade: false, // ❌ tuyệt đối không cascade ở đây
    eager: false,
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
    appointments: any;
    staffs: any;
}