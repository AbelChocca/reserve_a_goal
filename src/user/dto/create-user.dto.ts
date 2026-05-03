import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    title: 'User email',
    description: 'Introduce a valid email',
    example: 'abelchocca1010@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    title: 'User name',
    example: 'Abel Chocca',
  })
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password!: string;
}
