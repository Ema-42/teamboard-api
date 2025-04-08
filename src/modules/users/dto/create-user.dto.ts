import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    deleted?: boolean;

    @IsString()
    @IsNotEmpty()
    roleId: string;
}
