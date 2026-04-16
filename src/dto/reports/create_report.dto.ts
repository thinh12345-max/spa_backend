import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsOptional()
    @IsString()
    report_date!: Date;

    @IsOptional()
    @IsNumber({}, { message: 'Total revenue must be a number' })
    total_revenue!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Service revenue must be a number' })
    service_revenue!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Product revenue must be a number' })
    product_revenue!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Total appointments must be a number' })
    total_appointments!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Total customers must be a number' })
    total_customers!: number;

    @IsOptional()
    @IsString()
    created_at!: Date;
}
