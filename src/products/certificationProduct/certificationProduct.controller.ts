import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CertificationProductService } from './certificationProduct.service';
import { CustomFileFieldsInterceptor } from 'src/utils/file-upload.utils';
import { Certification } from 'src/models/products/certifications.schema/certification.schema';
import { CertifDto } from 'src/dto/certif.dto/certif.dto';

@Controller('certificationProduct')
export class CertificationProductController {
    constructor(private readonly certificationService : CertificationProductService){};
        
            @Post()
            @UseInterceptors(CustomFileFieldsInterceptor())
            async create(
              @UploadedFiles()
              files: {
               certifUrl?: Express.Multer.File[];
              },
              @Body() dto: CertifDto,
            ): Promise<Certification> {
              const certifUrl = files.certifUrl?.[0]
                ? `http://localhost:5000/uploads/${files.certifUrl[0].filename}`
                : '';
        
              return this.certificationService.create({
                ...dto,
                certifUrl,
                IsDraft : true,
              });
            }
        
        
          @Get()
          async findAll(): Promise<Certification[]> {
            return this.certificationService.findAll();
          }
        
          @Get(':id')
          async findOne(@Param('id') id: string): Promise<Certification> {
            return this.certificationService.findOne(id);
          }
        
          @Patch(':id')
          @UseInterceptors(CustomFileFieldsInterceptor())
          async update(
            @Param('id') id: string,
            @UploadedFiles()
            files: {
              certifUrl?: Express.Multer.File[];
            },
            @Body() dto: Partial<CertifDto>,
          ): Promise<Certification> {
            const certifUrl = files.certifUrl?.[0]
              ? `http://localhost:5000/uploads/${files.certifUrl[0].filename}`
              : undefined;
        
            return this.certificationService.update(id, {
              ...dto,
              ...(certifUrl && { certifUrl })
            });
          }
        
        
          @Delete(':id')
          @HttpCode(HttpStatus.NO_CONTENT)
          async remove(@Param('id') id: string): Promise<void> {
            await this.certificationService.remove(id);
          }
}
