import { IsNumber, IsOptional } from "class-validator";

export class QueryUserDto {

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}