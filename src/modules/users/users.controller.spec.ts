import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'src/common/enums/role.enum';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([]),
    createUser: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      role: Role.ADMIN,
    }),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of users', async () => {
    const users = await controller.findAll(undefined, undefined, 1, 10);
    expect(users).toEqual([]);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should create a user', async () => {
    const user = await controller.create({
      email: 'test@example.com',
      password: '123456',
      role: Role.ADMIN,
    });
    expect(user).toHaveProperty('id');
  });
});
