import {  ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ name: 'role',example: 'viewer', enum: Role })
  @IsEnum(Role)
  role: Role;
}
