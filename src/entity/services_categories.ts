import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('service_categories')
export class ServiceCategory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany('Service', (s: any) => s.category)
    services!: any[];
}
