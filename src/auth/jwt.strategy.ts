import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getConfig } from '../utils/getConfig';
import { Request as RequestType } from 'express';

const config = getConfig();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: config['JWT_SECRET'],
    });
  }

  private static extractJWT(req: RequestType): string | null {
    console.log(req);
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
