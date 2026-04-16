import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductCategoryDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsOptional()
    @IsString()
    name!: string;
}