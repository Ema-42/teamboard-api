import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsUUID,
  IsDateString,
  IsDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  @IsOptional()
  position: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  dueDate?: Date;

  @IsUUID()
  board_id: string;

  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @IsUUID()
  created_by: string;

  @IsOptional()
  @IsBoolean()
  check;
}
