import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: '1234'
      },
      {
        userId: 2,
        username: 'chris',
        password: '1234'
      },
      {
        userId: 3,
        username: 'maria',
        password: '1234'
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
