import { Injectable } from '@nestjs/common';
import { Command, ConsoleIO } from '@squareboat/nest-console';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { migrate } from '../migrations/migrate';

@Injectable()
export class CommandService {
  constructor(private usersService: UsersService) {}

  @Command('create:user', {
    desc: 'Create user',
  })
  async createUserCommand(_cli: ConsoleIO) {
    const user = {
      username: await _cli.ask('Username:'),
      password: await _cli.password('Password:'),
      repeatPassword: await _cli.password('Repeat password:'),
    };
    const existedUser = await this.usersService.getUserByName(user.username);

    if (!existedUser && user.password === user.repeatPassword) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);

      const newUser = await this.usersService.createUser({
        username: user.username,
        password: hashedPassword,
      });

      _cli.success(`Created user with name: ${newUser.username}`);
    } else if (user.password !== user.repeatPassword) {
      _cli.error(`Passwords not similar`);
    } else {
      _cli.error(`User with name: ${user.username}, already exists!`);
    }
    return;
  }

  @Command('migrate', { desc: 'migration' })
  async makeMigrations(_cli: ConsoleIO) {
    const confirm = await _cli.confirm('Do you want migrate data?');
    if (confirm) {
      await migrate();
    }
  }
}
