import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('booking_products')
export class BookingProduct {

    @PrimaryColumn({ type: 'bigint', unsigned: true })
    bookings_id!: number;

    @PrimaryColumn({ type: 'bigint', unsigned: true })
    products_id!: number;

    @ManyToOne('Booking')
    @JoinColumn({ name: 'bookings_id' })
    booking: any;

    @ManyToOne('Product', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'products_id' })
    product: any;

    @Column('decimal', { precision: 12, scale: 2 })
    price!: number;

    @Column({ default: 1 })
    quantity!: number;
}