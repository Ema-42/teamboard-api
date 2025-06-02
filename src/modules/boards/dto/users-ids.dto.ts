import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class UsersIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  usersIds: string[];
}
