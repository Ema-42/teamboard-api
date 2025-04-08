import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  estado: string = 'active';

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
