import { Controller,Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  BadRequestException,
  Delete,
  Param,
  Get, } from '@nestjs/common';
import { BombillService } from './bombill.service';
import { CustomFileFieldsInterceptor } from 'src/utils/file-upload.utils';
import { Bom } from 'src/models/products/bom.schema/bom.schema';
import { BomDto } from 'src/dto/bom.dto/bom.dto';

@Controller('bombill')
export class BombillController {
  constructor(private readonly bomService: BombillService) {}

  @Post()
  @UseInterceptors(
    CustomFileFieldsInterceptor()
  )
  async uploadBom(
    @UploadedFiles()
    files: {
      bomFile?: Express.Multer.File[];
      bomCerts?: Express.Multer.File[];
    },
       @Body() body: any,
  ): Promise<Bom | Bom[]> {
    const { components, summaryId } = body;

  
    if (files?.bomFile?.[0]) {
      const bomUrl = `http://localhost:5000/uploads/${files.bomFile[0].filename}`;
      return this.bomService.create({ bomUrl, summaryId , IsDraft: true});
    }


     if (components) {
      let parsedComponents: BomDto[] = [];

      try {
        parsedComponents = JSON.parse(components);
      } catch (error) {
        throw new Error('Invalid JSON for components');
      }

      parsedComponents.forEach((component, index) => {
         component.IsDraft = true;
        if (files?.bomCerts?.[index]) {
          component['bomCertUrl'] = `http://localhost:5000/uploads/${files.bomCerts[index].filename}`;
        }
      });

      return this.bomService.createMany(parsedComponents);
    }

    throw new BadRequestException('No BOM data provided.');
  }

    @Get()
  async findAll(): Promise<Bom[]> {
    return this.bomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bom> {
    return this.bomService.findOne(id);
  }


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.bomService.delete(id);
    return { message: `Bom with ID ${id} deleted successfully.` };
  }
}
