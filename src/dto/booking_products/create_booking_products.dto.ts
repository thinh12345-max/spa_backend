import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateBookingProductDto {

    @IsNumber({}, { message: 'Booking ID must be a number' })
    @Type(() => Number)
    bookings_id!: number;

    @IsNumber({}, { message: 'Product ID must be a number' })
    @Type(() => Number)
    products_id!: number;

    @IsNumber({}, { message: 'Price must be a number' })
    @Type(() => Number)
    price!: number;

    @IsNumber({}, { message: 'Quantity must be a number' })
    @Type(() => Number)
    quantity!: number;
}
