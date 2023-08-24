import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser('user_id') user_id: string,
  ) {
    return this.itemsService.create(createItemDto, user_id);
  }

  @Get()
  findAll(@CurrentUser('user_id') user_id: string) {
    return this.itemsService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('user_id') user_id: string) {
    return this.itemsService.findOne(id, user_id);
  }

  @Patch(':id/complete')
  markAsComplete(
    @Param('id') id: string,
    @CurrentUser('user_id') user_id: string,
  ) {
    return this.itemsService.markAsComplete(id, user_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @CurrentUser('user_id') user_id: string,
  ) {
    return this.itemsService.update(id, updateItemDto, user_id);
  }
}
