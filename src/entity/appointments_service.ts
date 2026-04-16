import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";

@Entity('appointment_services')
export class AppointmentService {
    repo: any;
    async getStaffAppointments(staffId: number) {
      return this.repo.find({
        where: {
            staff: { id: staffId},
        },
        relations: ['customer', 'service'],
      });
    }
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    appointment_id!: number;

    @ManyToOne('Appointment', (a: any) => a.services, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'appointment_id' })
    appointment!: any;

    @ManyToOne('Service', (s: any) => s.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'service_id' })
    service!: any;

    @Column('decimal', { precision: 12, scale: 2 })
    price_at_time!: number;
}
