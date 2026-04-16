import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInventoryLogDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsNumber({}, { message: 'Product ID must be a number' })
    @Type(() => Number)
    product_id!: number;

    @IsNumber({}, { message: 'Change quantity must be a number' })
    @Type(() => Number)
    changeQty!: number;

    @IsOptional()
    @IsString()
    type!: 'import' | 'export';

    @IsOptional()
    @Type(() => Date)
    createdAt!: Date;
}
