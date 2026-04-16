import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_categories')
export class ProductCategory {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @OneToMany('Product', (product: any) => product.category)
    products!: any[];
}