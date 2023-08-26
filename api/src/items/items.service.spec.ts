import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: {
            item: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const inputMockData: CreateItemDto = {
      content: 'test content',
    };

    const userIdMock: string = '1';

    let prismaSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      prismaSpy = jest.spyOn(prismaService.item, 'create');
    });

    it('should call create with correct options', async () => {
      await service.create(inputMockData, userIdMock);

      expect(prismaSpy).toHaveBeenCalledWith({
        data: {
          ...inputMockData,
          user_id: userIdMock,
        },
      });
      expect(prismaSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    const userIdMock: string = '1';

    let prismaSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      prismaSpy = jest.spyOn(prismaService.item, 'findMany');
    });

    it('should call create with correct options', async () => {
      await service.findAll(userIdMock);

      expect(prismaSpy).toHaveBeenCalledWith({
        where: {
          user_id: userIdMock,
        },
      });
      expect(prismaSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('markAsComplete', () => {
    const itemIdMock: string = 'abc';
    const userIdMock: string = '1';

    let prismaSpy: jest.SpyInstance;

    afterEach(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      prismaSpy = jest.spyOn(prismaService.item, 'update');
    });

    it('should call create with correct options', async () => {
      await service.markAsComplete(itemIdMock, userIdMock);

      expect(prismaSpy).toHaveBeenCalledWith({
        where: {
          id: itemIdMock,
          user_id: userIdMock,
        },
        data: {
          completed: true,
        },
      });
      expect(prismaSpy).toHaveBeenCalledTimes(1);
    });
  });
});
