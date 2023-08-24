import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
