import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
