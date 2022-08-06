import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetService } from '../commonServices/getService';
import { v4 } from 'uuid';

export interface User {
  username: string;
  password: string;
}

@Injectable()
export class UsersService extends GetService {
  getUserByName(username: string): Promise<User> {
    return this.addSearch(['username'], username).executeFindFirst(
      'User',
    ) as Promise<User>;
  }

  createUser(newUser: User) {
    return this.prismaService.user
      .create({
        data: {
          id: v4(),
          ...newUser,
        },
      })
      .then((user) => user)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
