import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: Role.VIEWER })
  @IsEnum(Role)
  role: string;
}
