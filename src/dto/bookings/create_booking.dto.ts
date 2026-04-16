import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsNumber({}, { message: 'Customer ID must be a number' })
    @Type(() => Number)
    customers_id!: number;

    @IsNumber({}, { message: 'Staff ID must be a number' })
    @Type(() => Number)
    staffs_id!: number;

    @IsOptional()
    @Type(() => Date)
    created_at!: Date;

    
    @IsNumber({}, { message: 'Total amount must be a number' })
    @Type(() => Number)
    total_amount!: number;

    @IsNumber({}, { message: 'Discount must be a number' })
    @Type(() => Number)
    discount!: number;

    @IsNumber({}, { message: 'Final amount must be a number' })
    @Type(() => Number)
    final_amount!: number;  

    
    @IsOptional()
    @IsString()
    enum!: ['open', 'paid', 'cancelled']
    status!: string;

}