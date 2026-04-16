import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateScheduleDto {
  
    @IsOptional()
    @IsNumber({}, { message: 'ID must be a number' })
    @Type(() => Number)
    id!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Staff ID must be a number' })
    staffs_id?: number;

    @IsOptional()
    @IsString()
    work_Date?: string;

    @IsOptional()
    @IsString()
    star_Time?: string;

    @IsOptional()
    @IsString()
    end_Time?: string;

}
