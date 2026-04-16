import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @Type(() => Date)
    birthday?: Date;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Loyalty points must be a number' })
    loyalty_points?: number;
}
