import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentSession } from './decorators/current-session.decorator';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

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

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async getPtofile(
    @GetCurrentSession('email') email: string,
  ): Promise<{ [key: string]: string }> {
    return {
      loggedInEmail: email,
    };
  }
}
