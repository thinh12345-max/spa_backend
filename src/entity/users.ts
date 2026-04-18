import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../entity/role';
import { Staff } from './staff';

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

  @Column()
  role_id!: number;

  @OneToMany(() => Staff, (staff) => staff.user)
  staffs!: Staff[];

  // Quan hệ tới bảng roles
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
  appointments: any;
}
