import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TechnicalProductService } from './technicalProduct.service';
import { TechnicalDto } from 'src/dto/technical.dto/technical.dto';
import { Technical } from 'src/models/products/technical.schema/technical.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/models/users/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('technicalProduct')
export class TechnicalProductController {
     constructor(private readonly technicalService : TechnicalProductService){};
        
        @Post()
            @HttpCode(HttpStatus.CREATED)
              async create(@Body() dto: TechnicalDto): Promise<Technical> {
                return this.technicalService.create({ 
                  ...dto,
                  IsDraft: true,});
              }
            
        
        @Get()
          async findAll(): Promise<Technical[]> {
            return this.technicalService.findAll();
          }
        
          @Get(':id')
          async findOne(@Param('id') id: string): Promise<Technical> {
            return this.technicalService.findOne(id);
          }
        
        @Patch(':id')
         async update(@Param('id') id: string, @Body() dto: Partial<TechnicalDto>): Promise<Technical> {
             return this.technicalService.update(id, dto);
           }
        
        
          @Delete(':id')
          @HttpCode(HttpStatus.NO_CONTENT)
          async remove(@Param('id') id: string): Promise<void> {
            await this.technicalService.remove(id);
          }
}
