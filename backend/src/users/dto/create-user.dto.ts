import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsNumber()
  age?: number;
}
