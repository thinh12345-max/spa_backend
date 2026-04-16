import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {

    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsString()
    @IsNotEmpty({ message: 'role name is required' })
    name!: string;

}
