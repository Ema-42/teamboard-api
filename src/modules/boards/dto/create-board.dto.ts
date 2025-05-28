import { IsString, IsUUID } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  estado: string = 'active';

  @IsUUID()
  ownerId: string;
}
