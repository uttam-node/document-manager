import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  const reflector = { get: jest.fn() };

  beforeEach(() => {
    guard = new RolesGuard(reflector as any);
  });

  it('allows access if no roles are required', () => {
    reflector.get.mockReturnValue(undefined);
    const mockCtx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'admin' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockCtx)).toBe(true);
  });

  it('allows access for matching roles', () => {
    reflector.get.mockReturnValue(['admin']);
    const mockCtx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'admin' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockCtx)).toBe(true);
  });

  it('denies access for mismatched roles', () => {
    reflector.get.mockReturnValue(['admin']);
    const mockCtx = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'viewer' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockCtx)).toBe(false);
  });
});
