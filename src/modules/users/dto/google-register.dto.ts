import { IsString } from 'class-validator';

export class GoogleRegisterDto {
    @IsString()
    jwt: string;
}