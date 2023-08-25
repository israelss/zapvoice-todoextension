import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const inputMock: CreateUserDto = {
      email: 'user@email.com',
      password_hash: '123',
    };

    let prismaSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      prismaSpy = jest.spyOn(prismaService.user, 'create');
    });

    it('should call create with correct options', async () => {
      await service.create(inputMock);

      expect(prismaSpy).toHaveBeenCalledWith({
        data: inputMock,
      });
      expect(prismaSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByEmail', () => {
    const inputMock: string = 'user@email.com';

    let prismaSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      prismaSpy = jest.spyOn(prismaService.user, 'findUnique');
    });

    it('should call findUnique with correct options', async () => {
      await service.findOneByEmail(inputMock);

      expect(prismaSpy).toHaveBeenCalledWith({
        where: { email: inputMock },
      });
      expect(prismaSpy).toHaveBeenCalledTimes(1);
    });
  });
});
