import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsString()
    @IsNotEmpty({ message: 'Service name is required' })
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    price?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Duration must be a number' })
    duration_minutes?: number;
    
    @IsOptional()
    @IsNumber({}, { message: 'Category ID must be a number' })
    category_id?: number;
}
