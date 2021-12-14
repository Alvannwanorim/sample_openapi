import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import {
  CreateUserInput,
  ErrorMessage,
  LoginUserInput,
  UpdateUserInput,
  UserDTO,
} from '../inputs/user.input';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@Description: Create New User
  //@Route: /auth/register
  //@Acess: Public
  @ApiBody({ type: CreateUserInput })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 404, type: ErrorMessage, description: 'Not Found.' })
  @ApiResponse({ status: 403, type: ErrorMessage, description: 'Forbidden.' })
  @ApiResponse({
    status: 400,
    type: ErrorMessage,
    description: 'Bad Request .',
  })
  @ApiResponse({
    status: 401,
    type: ErrorMessage,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 406,
    type: ErrorMessage,
    description: 'Not Acceptable.',
  })
  @Post('register')
  craeteUser(@Body() createUserDTO: CreateUserInput) {
    return this.authService.createUser(createUserDTO);
  }

  //@Description: Login User
  //@Route: /auth/login
  //@Acess: Public
  @ApiBody({ type: LoginUserInput })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, type: ErrorMessage, description: 'Forbidden.' })
  @ApiResponse({ status: 404, type: ErrorMessage, description: 'Not Found.' })
  @ApiResponse({ status: 400, type: ErrorMessage, description: 'Bad Request.' })
  @ApiResponse({
    status: 401,
    type: ErrorMessage,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 406,
    type: ErrorMessage,
    description: 'Not Acceptable.',
  })
  @Post('login')
  loginUser(@Body() input: LoginUserInput) {
    return this.authService.login(input);
  }

  //@Description: Get User By ID
  //@Route: /auth/register
  //@Acess: Public
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    type: UserDTO,
    description: 'Creates new user object.',
  })
  @ApiResponse({ status: 403, type: ErrorMessage, description: 'Forbidden.' })
  @ApiResponse({
    status: 406,
    type: ErrorMessage,
    description: 'Not Acceptable.',
  })
  @ApiResponse({ status: 404, type: ErrorMessage, description: 'Not Found.' })
  @Get()
  getUser(@Request() req) {
    return this.authService.getUser(req.user);
  }

  //@Description: Get Users
  //@Route: /auth/
  //@Acess: Public
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

  //@Description: Update User Detials
  //@Route: /auth/user
  //@Acess: Private
  @ApiBody({ type: UpdateUserInput })
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    type: UserDTO,
    description: ' user array.',
  })
  @ApiResponse({ status: 403, type: ErrorMessage, description: 'Forbidden.' })
  @ApiResponse({
    status: 406,
    type: ErrorMessage,
    description: 'Not Acceptable.',
  })
  @ApiResponse({ status: 404, type: ErrorMessage, description: 'Not Found.' })
  @Put('user')
  updateUser(@Body() input: UpdateUserInput, @Request() req) {
    return this.authService.updateUser(input, req.user);
  }

  //@Description: Delete User From Database
  //@Route: /auth/user
  //@Acess: Private
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
  @Delete('user')
  deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user);
  }
}
