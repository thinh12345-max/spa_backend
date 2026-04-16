import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff";
import { Payment } from "./payments";

@Entity('bookings')
export class Booking {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @ManyToOne('Customer')
  @JoinColumn({ name: 'customers_id' })
  customer: any;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments!: Payment[];

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  total_amount!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  discount!: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  final_amount!: number;

  @Column({
    type: 'enum',
    enum: ['open', 'paid', 'cancelled'],
    default: 'open',
  })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}