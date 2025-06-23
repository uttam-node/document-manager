import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'pass123',
      role: 'viewer',
    };
    mockUsersService.createUser.mockResolvedValue({ ...dto });

    const result = await authService.register(dto);
    expect(result).toEqual(dto);
    expect(mockUsersService.createUser).toHaveBeenCalled();
  });

  it('should login with correct credentials', async () => {
    const password = 'password';
    const hashed = await bcrypt.hash(password, 10);

    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      role: 'admin',
      password: hashed,
    });

    const token = await authService.login({
      email: 'test@example.com',
      password,
    });
    expect(token.access_token).toBe('mock-jwt-token');
  });

  it('should throw if password is wrong', async () => {
    const hashed = await bcrypt.hash('notmatching', 10);
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      role: 'admin',
      password: hashed,
    });

    await expect(
      authService.login({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow();
  });
});
