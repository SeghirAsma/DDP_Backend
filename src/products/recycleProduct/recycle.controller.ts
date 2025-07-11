import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RecycleService } from './recycle.service';
import { RecycleDto } from 'src/dto/recycle.dto/recycle.dto';
import { Recycle } from 'src/models/products/recycle.schema/recycle.schema';

@Controller('recycle')
export class RecycleController {
     constructor(private readonly recycleService: RecycleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RecycleDto): Promise<Recycle> {
    return this.recycleService.create({ 
                  ...dto,
                  IsDraft: true,});
  }

  @Get()
  async findAll(): Promise<Recycle[]> {
    return this.recycleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recycle> {
    return this.recycleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<RecycleDto>): Promise<Recycle> {
    return this.recycleService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.recycleService.remove(id);
  }
}
