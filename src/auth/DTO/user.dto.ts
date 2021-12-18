import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  firstName: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  lastName: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  email: string;
  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  password: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  role: string;
}

export class ErrorMessage {
  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @MaxLength(100)
  @MinLength(20)
  message: string;
}
export class CreateUserInput {
  @ApiProperty({
    description: 'for firstname',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
    additionalProperties: false,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
export class UpdateUserInput {
  @ApiProperty({
    description: 'for first name',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'for last name ',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class LoginUserInput {
  @ApiProperty({
    description: 'for email',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'for password',
    type: String,
    pattern: '^[A-Za-z0-9]{3,10}$',
    maxLength: 50,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
