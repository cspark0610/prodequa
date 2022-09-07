import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Token } from './types';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getToken(id: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: id, email },
      {
        expiresIn: 60 * 60 * 24,
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      access_token: accessToken,
    };
  }

  async signup(authDto: AuthDto): Promise<Token> {
    const hash = await this.hashData(authDto.password);
    const newAuthRecord = await this.authRepository.create({
      ...authDto,
      password: hash,
    });
    const token = await this.getToken(newAuthRecord._id, newAuthRecord.email);

    return token;
  }

  async login(authDto: AuthDto): Promise<Token> {
    const authRecord = await this.authRepository.findOne({
      email: authDto.email,
    });

    if (!authRecord) throw new ForbiddenException('Access denied');

    const passwordIsValid = bcrypt.compare(
      authDto.password,
      authRecord.password,
    );
    if (!passwordIsValid) throw new ForbiddenException('Access denied');

    const token = await this.getToken(authRecord._id, authRecord.email);
    return token;
  }
}
