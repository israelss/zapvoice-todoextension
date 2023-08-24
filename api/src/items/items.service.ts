import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  create(createItemDto: CreateItemDto, user_id: string) {
    return this.prismaService.item.create({
      data: {
        ...createItemDto,
        user_id,
      },
    });
  }

  findAll(user_id: string) {
    return this.prismaService.item.findMany({
      where: {
        user_id,
      },
    });
  }

  findOne(id: string, user_id: string) {
    return this.prismaService.item.findUnique({
      where: {
        id,
        user_id,
      },
    });
  }

  update(id: string, updateItemDto: UpdateItemDto, user_id: string) {
    return this.prismaService.item.update({
      where: {
        id,
        user_id,
      },
      data: updateItemDto,
    });
  }

  markAsComplete(id: string, user_id: string) {
    return this.prismaService.item.update({
      where: {
        id,
        user_id,
      },
      data: {
        completed: true,
      },
    });
  }
}
