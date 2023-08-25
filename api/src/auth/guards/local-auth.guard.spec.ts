import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
  it('should extend AuthGuard(local)', () => {
    expect(new LocalAuthGuard()).toBeInstanceOf(AuthGuard('local'));
  });
});
