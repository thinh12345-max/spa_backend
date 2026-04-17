import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users";
import { Staff } from './staff';
import { AppointmentService } from "./appointments_service";
import { Payment } from "./payments";

@Entity('appointments')
export class Appointment {
    
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id!: number;

    @ManyToOne(() => Staff, (staff) => staff.appointments)
    @JoinColumn({ name: 'staff_id' })
    staff!: Staff;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: 'customer_id' })
    customer!: User;

    @Column({ type: 'datetime' })
    appointment_time!: Date;

    @Column({ type: 'enum',
        enum: ['pending', 'confirmed', 'completed', 'in_progress', 'cancelled'],
        default: 'pending'
    })
    status!: string;

    @OneToMany(() => AppointmentService, as => as.appointment, { cascade: true })
    services!: AppointmentService[];
    
    @Column({ type: 'text', nullable: true })
    note!: string;

    @OneToMany(() => Payment, payment => payment.appointment)
    payments!: Payment[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}