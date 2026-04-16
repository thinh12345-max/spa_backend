import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsString()
    @IsNotEmpty({ message: 'Product name is required' })
    name!: string;

    @IsOptional()
    @IsString()
    description!: string;

    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    @Type(() => Number)
    price!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Stock must be a number' })
    @Type(() => Number)
    stock!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Category ID must be a number' })
    @Type(() => Number)
    category_id!: number;
}
