import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true})
    id!: number;

    @Column({ type: 'date' })
    report_date!: Date;

    @Column('decimal', { precision: 14, scale: 2, default: 0 })
    total_revenue!: number;

    @Column('decimal', { precision: 14, scale: 2, default: 0 })
    service_revenue!: number;

    @Column('decimal', { precision: 14, scale: 2, default: 0})
    product_revenue!: number;

    @Column({ default: 0 })
    total_appointments!: number;

    @Column({ default: 0 })
    total_customers!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}