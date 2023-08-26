import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { excludeField } from '../prisma/utils/utils';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto, user_id: string) {
    await this.prismaService.item.create({
      data: {
        ...createItemDto,
        user_id,
      },
    });

    return true;
  }

  async findAll(user_id: string) {
    const items = await this.prismaService.item.findMany({
      orderBy: { created_at: 'asc' },
      where: {
        user_id,
      },
    });
    return items.map((item) => excludeField(item, ['user_id']));
  }

  async markAsComplete(id: string, user_id: string) {
    await this.prismaService.item.update({
      where: {
        id,
        user_id,
      },
      data: {
        completed: true,
      },
    });

    return true;
  }
}
