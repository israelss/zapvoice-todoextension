import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
  it('should extend AuthGuard(jwt)', () => {
    expect(new JwtAuthGuard()).toBeInstanceOf(AuthGuard('jwt'));
  });
});
