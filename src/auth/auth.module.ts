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
    PassportModule,
    JwtModule.register({
      secret: config['JWT_SECRET'],
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}