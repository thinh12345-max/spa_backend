import { Type } from "class-transformer";
import { IsInt, IsNumber, Min } from "class-validator";

export class CreateAppointmentServiceDto {

    @IsInt()
    @Min(1)
    appointment_id!: number;

    @IsInt()
    @Min(1)
    service_id!: number;

    @IsNumber({}, { message: 'Price at time must be a number' })
    @Min(0)
    price_at_time!: number;

    @IsInt()
    @Min(1)
    quantity!: number;
}
