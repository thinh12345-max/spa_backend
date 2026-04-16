import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('booking_services')
export class BookingService {

  @PrimaryColumn({ type: 'bigint', unsigned: true })
  bookings_id!: number;

  @PrimaryColumn({ type: 'bigint', unsigned: true })
  services_id!: number;

  @ManyToOne('Booking', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookings_id' })
  booking: any;

  @ManyToOne('Service', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'services_id' })
  service: any;

  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;

  @Column({ default: 1 })
  quantity!: number;
}