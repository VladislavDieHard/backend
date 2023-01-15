import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getConfig } from '../utils/getConfig';

const jwsService = new JwtService();
const userService = new UsersService();
const config = getConfig();

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.token;

    const decoded = jwsService.decode(token) as any | null;

    if (request.cookies.token && decoded) {
      if (jwsService.verify(token, { secret: config['JWT_SECRET'] })) {
        const user = await userService.getUserByName(decoded.username);
        const newToken = jwsService.sign(
          { username: user.username },
          { secret: config['JWT_SECRET'] },
        );

        request.res.cookie('token', newToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 2,
        });

        return true;
      }
    }

    return false;
  }
}
