import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('inventory_logs')
export class InventoryLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('Product')
    @JoinColumn({ name: 'product_id' })
    product: any;

    @Column()
    changeQty!: number;

    @Column({
        type: 'enum',
        enum: ['import', 'export'],
    })
    type!: string;

    @CreateDateColumn()
    createdAt!: Date;
}