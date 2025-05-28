import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsUUID,
  IsDateString,
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
  @IsDateString()
  dueDate?: string;

  @IsUUID()
  board_id: string;

  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @IsUUID()
  created_by: string;
}
