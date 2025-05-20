import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  jwt: string;
}
