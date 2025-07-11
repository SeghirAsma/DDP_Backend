import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CarbonProductService } from './carbonProduct.service';
import { CarbonDto } from 'src/dto/carbon.dto/carbon.dto';
import { Carbon } from 'src/models/products/carbon.schema/carbon.schema';

@Controller('carbonProduct')
export class CarbonProductController {
   constructor(private readonly carbonService: CarbonProductService) {}
   
     @Post()
     @HttpCode(HttpStatus.CREATED)
     async create(@Body() dto: CarbonDto): Promise<Carbon> {
       return this.carbonService.create({ 
                  ...dto,
                  IsDraft: true,});
     }
   
     @Get()
     async findAll(): Promise<Carbon[]> {
       return this.carbonService.findAll();
     }
   
     @Get(':id')
     async findOne(@Param('id') id: string): Promise<Carbon> {
       return this.carbonService.findOne(id);
     }
   
     @Patch(':id')
     async update(@Param('id') id: string, @Body() dto: Partial<CarbonDto>): Promise<Carbon> {
       return this.carbonService.update(id, dto);
     }
   
     @Delete(':id')
     async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
       return this.carbonService.remove(id);
     }
}
