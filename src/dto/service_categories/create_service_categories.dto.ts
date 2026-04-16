import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceCategoryDto {
  
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    is_active!: boolean;

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;
}
