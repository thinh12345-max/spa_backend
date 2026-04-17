import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { Appointment } from './appointments';
import { Service } from './services';

@Entity('appointment_services')
export class AppointmentService {
  
  @PrimaryColumn()
  appointment_id!: number;

  @PrimaryColumn()
  service_id!: number;

  @ManyToOne(() => Appointment, (a) => a.services)
  @JoinColumn({ name: 'appointment_id' })
  appointment!: Appointment;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service!: Service;

  @Column({ type: 'decimal' })
  price_at_time!: number;

  @Column({ type: 'int' })
  quantity!: number;
}