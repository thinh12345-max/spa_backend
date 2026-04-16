import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsNumber({}, { message: 'Amount must be a number' })
    @Type(() => Number)
    amount!: number;

    @IsNumber({}, { message: 'Booking ID must be a number' })
    @Type(() => Number)
    booking_id!: number;

    @IsOptional()
    @IsString()
    method!: 'cash' | 'card' | 'bank' | 'momo';

    @IsOptional()
    @IsString()
    status!: 'success' | 'failed' | 'pending';

    @IsOptional()
    @Type(() => Date)
    paid_at!: Date;   
}
