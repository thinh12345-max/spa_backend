import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('Staff')
    @JoinColumn({ name: 'staffs_id' })
    staff: any;

    @Column({ type: 'date' })
    work_Date!: Date;

    @Column({ type: 'time' })
    star_Time!: string;

    @Column({ type: 'time' })
    end_Time!: string;
}