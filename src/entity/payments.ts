import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Appointment } from "./appointments";
import { Booking } from "./bookings";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: number;

    @Column('decimal', { precision: 12, scale: 2 })
    amount!: number;

    @ManyToOne(() => Appointment, (appointment) => appointment.payments)
    appointment!: Appointment;

    @ManyToOne(() => Booking, (booking) => booking.payments)
    @JoinColumn({ name: 'booking_id' })
    booking!: Booking;

    @Column({
    type: 'enum',
    enum: ['cash', 'card', 'bank', 'momo'],
    })
    method!: string;

    @Column({
    type: 'enum',
    enum: ['success', 'failed', 'pending'],
    default: 'pending',
    })
    status!: string;

    @Column({ type: 'datetime' })
    paid_at!: Date;
}