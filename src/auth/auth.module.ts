import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '../utils/getConfig';
import { JwtStrategy } from './jwt.strategy';

const config = getConfig();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: config['JWT_SECRET'],
      signOptions: { expiresIn: 1000 * 60 * 60 * 24 * 2 },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
