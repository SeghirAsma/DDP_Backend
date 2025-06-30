import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { LifeCycleProductService } from './lifeCycleProduct.service';
import { LifeCycle } from 'src/models/products/lifecycle.schema/lifecycle.schema';
import { LifeCycleDto } from 'src/dto/lifeCycle.dto/lifeCycle.dto';

@Controller('lifeCycleProduct')
export class LifeCycleProductController {
       constructor(private readonly lifeCycleService: LifeCycleProductService) {}
       
         @Post()
         @HttpCode(HttpStatus.CREATED)
         async create(@Body() dto: LifeCycleDto): Promise<LifeCycle> {
           return this.lifeCycleService.create(dto);
         }
       
         @Get()
         async findAll(): Promise<LifeCycle[]> {
           return this.lifeCycleService.findAll();
         }
       
         @Get(':id')
         async findOne(@Param('id') id: string): Promise<LifeCycle> {
           return this.lifeCycleService.findOne(id);
         }
       
         @Patch(':id')
         async update(@Param('id') id: string, @Body() dto: Partial<LifeCycleDto>): Promise<LifeCycle> {
           return this.lifeCycleService.update(id, dto);
         }
       
         @Delete(':id')
         async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
           return this.lifeCycleService.remove(id);
         }
}
