import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  firstName: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  lastName: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  email: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // @MaxLength(50)
  password: string;
  role: string;
}

export class ErrorMessage {
  @MaxLength(100)
  @MinLength(20)
  message: string;
}
export class CreateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

export class LoginUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
