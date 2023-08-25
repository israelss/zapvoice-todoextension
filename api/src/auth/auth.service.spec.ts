import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Hash } from '../utils/hash';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user/current-user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const inputMock = {
      email: 'user@email.com',
      password: 'password',
    };
    const userMock: User = {
      id: '1',
      email: 'user@email.com',
      password_hash: '123',
    };

    let usersSpy: jest.SpyInstance;
    let hashSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      usersSpy = jest.spyOn(usersService, 'findOneByEmail');
      hashSpy = jest.spyOn(Hash, 'validate');
    });

    it('should return CurrentUser if email and password are correct', async () => {
      usersSpy.mockResolvedValueOnce(userMock);
      hashSpy.mockResolvedValueOnce(true);

      await expect(
        service.validateUser(inputMock.email, inputMock.password),
      ).resolves.toStrictEqual<CurrentUser>({
        email: userMock.email,
        user_id: userMock.id,
      });

      expect(usersSpy).toHaveBeenCalledWith(userMock.email);
      expect(usersSpy).toHaveBeenCalledTimes(1);

      expect(hashSpy).toHaveBeenCalledWith(
        inputMock.password,
        userMock.password_hash,
      );
      expect(hashSpy).toHaveBeenCalledTimes(1);
    });
    it('should return null if email not found', async () => {
      usersSpy.mockResolvedValueOnce(null);

      await expect(
        service.validateUser('wrong@email.com', inputMock.password),
      ).resolves.toBeNull();

      expect(usersSpy).toHaveBeenCalledWith('wrong@email.com');
      expect(usersSpy).toHaveBeenCalledTimes(1);

      expect(hashSpy).not.toHaveBeenCalled();
    });
    it('should return null if password is incorrect', async () => {
      usersSpy.mockResolvedValueOnce(userMock);
      hashSpy.mockResolvedValueOnce(false);

      await expect(
        service.validateUser(inputMock.email, 'wrong_password'),
      ).resolves.toBeNull();

      expect(usersSpy).toHaveBeenCalledWith(inputMock.email);
      expect(usersSpy).toHaveBeenCalledTimes(1);

      expect(hashSpy).toHaveBeenCalledWith(
        'wrong_password',
        userMock.password_hash,
      );
      expect(hashSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    const inputMock: CurrentUser = {
      email: 'user@email.com',
      user_id: '1',
    };

    let jwtSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      jwtSpy = jest.spyOn(jwtService, 'sign');
    });

    it('should return an object with access_token', async () => {
      jwtSpy.mockReturnValueOnce('123456');

      await expect(service.login(inputMock)).resolves.toStrictEqual<{
        access_token: string;
      }>({
        access_token: '123456',
      });

      expect(jwtSpy).toHaveBeenCalledWith(inputMock);
      expect(jwtSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('register', () => {
    const inputMock = {
      email: 'user@email.com',
      password: 'password',
    };
    const createUserMock: CreateUserDto = {
      email: 'user@email.com',
      password_hash: '123',
    };
    const userMock: User = {
      id: '1',
      email: 'user@email.com',
      password_hash: '123',
    };

    let usersSpy: jest.SpyInstance;
    let hashSpy: jest.SpyInstance;
    let jwtSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      usersSpy = jest.spyOn(usersService, 'create');
      hashSpy = jest.spyOn(Hash, 'createHash');
      jwtSpy = jest.spyOn(jwtService, 'sign');
    });

    it('should return an object with access_token', async () => {
      hashSpy.mockResolvedValueOnce('123');
      usersSpy.mockResolvedValueOnce(userMock);
      jwtSpy.mockReturnValueOnce('123456');

      await expect(service.register(inputMock)).resolves.toStrictEqual<{
        access_token: string;
      }>({
        access_token: '123456',
      });

      expect(usersSpy).toHaveBeenCalledWith(createUserMock);
      expect(usersSpy).toHaveBeenCalledTimes(1);

      expect(hashSpy).toHaveBeenCalledWith(inputMock.password);
      expect(hashSpy).toHaveBeenCalledTimes(1);

      expect(jwtSpy).toHaveBeenCalledWith({
        email: userMock.email,
        user_id: userMock.id,
      });
      expect(jwtSpy).toHaveBeenCalledTimes(1);
    });
  });
});
