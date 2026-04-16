import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true})
    id!: number;

    @ManyToOne('ProductCategory')
    @JoinColumn({ name: 'category_id' })
    category: any;

    @Column()
    name!: string;

    @Column('decimal', { precision: 12, scale: 2 })
    price!: number;

    @Column({ default: 0})
    stock!: number;

    @Column({ nullable: true })
    description!: string;

    @Column({ default: true })
    is_active!: boolean;
    bookingProducts!: any;
}