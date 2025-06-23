import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const users = [{ id: 1, email: 'a@test.com', role: 'admin', password: '123' }];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockImplementation((u) => u),
            save: jest.fn().mockResolvedValue(users[0]),
            findOneBy: jest.fn().mockResolvedValue(users[0]),
            findOneByOrFail: jest.fn(),
            find: jest.fn().mockResolvedValue(users),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should find user by email', async () => {
    const user = await service.findByEmail('a@test.com');
    expect(user).toEqual(users[0]);
  });

  it('should create user', async () => {
    const user = await service.createUser({
      email: 'a@test.com',
      password: '123456',
      role: 'admin',
    });
    expect(user).toEqual(users[0]);
  });
});
