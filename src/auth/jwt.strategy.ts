import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getConfig } from '../utils/getConfig';

const config = getConfig();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config['JWT_SECRET'],
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
