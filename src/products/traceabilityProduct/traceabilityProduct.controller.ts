import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TraceabilityProductService } from './traceabilityProduct.service';
import { CustomFileFieldsInterceptor } from 'src/utils/file-upload.utils';
import { TraceabilityDto } from 'src/dto/traceability.dto/traceability.dto';
import { Traceability } from 'src/models/products/traceability.schema/traceability.schema';

@Controller('traceabilityProduct')
export class TraceabilityProductController {
    constructor(private readonly traceabilityService : TraceabilityProductService){};
    
        @Post()
        @UseInterceptors(CustomFileFieldsInterceptor())
        async create(
          @UploadedFiles()
          files: {
           fileTraceability?: Express.Multer.File[];
          },
          @Body() dto: TraceabilityDto,
        ): Promise<Traceability> {
          const fileTraceabilityUrl = files.fileTraceability?.[0]
            ? `http://localhost:5000/uploads/${files.fileTraceability[0].filename}`
            : '';
    
          return this.traceabilityService.create({
            ...dto,
            fileTraceabilityUrl,
            IsDraft : true,
          });
        }
    
    
      @Get()
      async findAll(): Promise<Traceability[]> {
        return this.traceabilityService.findAll();
      }
    
      @Get(':id')
      async findOne(@Param('id') id: string): Promise<Traceability> {
        return this.traceabilityService.findOne(id);
      }
    
      @Patch(':id')
      @UseInterceptors(CustomFileFieldsInterceptor())
      async update(
        @Param('id') id: string,
        @UploadedFiles()
        files: {
          fileTraceability?: Express.Multer.File[];
        },
        @Body() dto: Partial<TraceabilityDto>,
      ): Promise<Traceability> {
        const fileTraceabilityUrl = files.fileTraceability?.[0]
          ? `http://localhost:5000/uploads/${files.fileTraceability[0].filename}`
          : undefined;
    
        return this.traceabilityService.update(id, {
          ...dto,
          ...(fileTraceabilityUrl && { fileTraceabilityUrl })
        });
      }
    
    
      @Delete(':id')
      @HttpCode(HttpStatus.NO_CONTENT)
      async remove(@Param('id') id: string): Promise<void> {
        await this.traceabilityService.remove(id);
      }
}
