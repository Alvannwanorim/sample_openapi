import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import {
  CreateUserInput,
  ErrorMessage,
  LoginUserInput,
  UserDTO,
} from '../inputs/user.input';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserInput })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 406, description: 'Not Acceptable.' })
  @Post('register')
  craeteUser(@Body() createUserDTO: CreateUserInput) {
    return this.authService.createUser(createUserDTO);
  }

  @ApiBody({ type: LoginUserInput })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 406, description: 'Not Acceptable.' })
  @Post('login')
  loginUser(@Body() input: LoginUserInput) {
    return this.authService.login(input);
  }

  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    type: UserDTO,
    description: 'Creates new user object.',
  })
  @ApiResponse({ status: 403, type: String, description: 'Forbidden.' })
  @ApiResponse({ status: 406, type: String, description: 'Not Acceptable.' })
  @ApiResponse({ status: 404, type: String, description: 'Not Found.' })
  @Get()
  getUser(@Request() req) {
    return this.authService.getUser(req.user);
  }

  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    type: [UserDTO],
    description: ' user array.',
  })
  @ApiResponse({ status: 403, type: ErrorMessage, description: 'Forbidden.' })
  @ApiResponse({
    status: 406,
    type: ErrorMessage,
    description: 'Not Acceptable.',
  })
  @ApiResponse({ status: 404, type: ErrorMessage, description: 'Not Found.' })
  @Get('users')
  getAllUser() {
    return this.authService.getUsers();
  }
}
