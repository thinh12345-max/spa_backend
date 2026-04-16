import { Booking } from "../entity/bookings";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn({ type: 'bigint',unsigned: true })
    id!: number;

    @Column()
    full_name!: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ type: 'date', nullable: true })
    birthday?: Date;

    @Column({
        type: 'enum',
        enum: ['male', 'female', 'other']
    })
    gender!: string;

    @Column({ type: 'text', nullable: true })
    address?: string;

    @Column({ default: 0 })
    loyalty_points!: number;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany('Booking', (booking: any) => booking.customer)
    bookings!: any[];

    @OneToMany('Appointment', (appointment: any) => appointment.customer)
    appointments!: any[];
}
