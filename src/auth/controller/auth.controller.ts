import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { CreateUserInput, LoginUserInput } from '../inputs/user.input';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserInput })
  @Post('register')
  craeteUser(@Body() createUserDTO: CreateUserInput) {
    return this.authService.createUser(createUserDTO);
  }

  @ApiBody({ type: LoginUserInput })
  @Post('login')
  loginUser(@Body() input: LoginUserInput) {
    return this.authService.login(input);
  }

  @UseGuards(JwtGuard)
  @Get()
  getUser(@Request() req) {
    return this.authService.getUser(req.user);
  }
  @UseGuards(JwtGuard)
  @Get()
  getAllUser(@Request() req) {
    return this.authService.getUsers();
  }
}
