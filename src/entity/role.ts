import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../entity/users';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}