import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff";

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Staff, (staff) => staff.schedules)
  @JoinColumn({ name: 'staff_id' })
  staff!: Staff;

  @Column({ type: 'date' })
  work_Date!: Date;

  @Column({ type: 'time' })
  start_Time!: string;

  @Column({ type: 'time' })
  end_Time!: string;
}