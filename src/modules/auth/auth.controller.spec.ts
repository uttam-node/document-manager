import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from 'src/common/enums/role.enum';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      role: Role.VIEWER,
    }),
    login: jest.fn().mockResolvedValue({
      access_token: 'mock-token',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register({
      email: 'test@example.com',
      password: 'password123',
      role: Role.VIEWER,
    });
    expect(result).toHaveProperty('id');
    expect(mockAuthService.register).toHaveBeenCalled();
  });

  it('should login and return access token', async () => {
    const result = await controller.login({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual({ access_token: 'mock-token' });
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
