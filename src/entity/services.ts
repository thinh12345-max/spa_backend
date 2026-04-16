import { ServiceCategory } from '../entity/services_categories';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, OneToMany, } from 'typeorm';

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id!: number;

    @ManyToOne('ServiceCategory', (category: any) => category.services)
    @JoinColumn({ name: 'category_id' })
    category!: any;

    @Column()
    name!: string;

    @Column('decimal', { precision: 12, scale: 2 })
    price!: number;

    @Column('int')
    duration_minutes!: number;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: true })
    is_active!: boolean;

    @OneToMany('AppointmentService', (s: any) => s.service)
    appointments!: any[];
    bookingServices!: any;
}
