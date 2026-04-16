import { Column, Entity, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { PrimaryGeneratedColumn } from 'typeorm'
import { Appointment } from './appointments';
import { User } from "./users";
import { Booking } from "./bookings";

@Entity ('staffs')
export class Staff {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: number;

    @Column({ unique: true })
    email!: string;

    @ManyToOne(() => User, (user) => user.staffs, {
    nullable: true,
    onDelete: 'SET NULL',
})
    @JoinColumn({ name: 'users_id' })
    user?: User;

    @OneToMany(() => Appointment, (appointment) => appointment.staff)
    appointments!: Appointment[];

    @Column()
    full_name!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    position!: string;

    @Column('decimal', { precision: 12, scale: 2, default: 0})
    salary!: number;

    @Column({ type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active' 
    })
    status!: string;
}