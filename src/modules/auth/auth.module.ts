import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, Auth } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AccessTokenStrategy],
  exports: [MongooseModule],
})
export class AuthModule {}
