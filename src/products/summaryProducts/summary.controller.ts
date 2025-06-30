import { Controller, Post, Get, Param, Body, Delete, HttpCode, HttpStatus, Patch,UploadedFile,
  UseInterceptors, UploadedFiles,} from '@nestjs/common';
import { SummaryDto } from 'src/dto/summary.dto/summary.dto';
import { Summary } from 'src/models/products/summary.schema/summary.schema';
import { SummaryService } from './summary.service';
import { CustomFileFieldsInterceptor,  } from 'src/utils/file-upload.utils';

@Controller('products')
   export class SummaryController { constructor(private readonly summaryService : SummaryService){};

    @Post()
    @UseInterceptors(CustomFileFieldsInterceptor())
    async create(
      @UploadedFiles()
      files: {
        file?: Express.Multer.File[];
        additionalImages?: Express.Multer.File[];
      },
      @Body() dto: SummaryDto,
    ): Promise<Summary> {
      const imageUrl = files.file?.[0]
        ? `http://localhost:5000/uploads/${files.file[0].filename}`
        : '';

      const additionalImageUrl = files.additionalImages?.map(
        (f) => `http://localhost:5000/uploads/${f.filename}`,
      ) || [];

      return this.summaryService.create({
        ...dto,
        imageUrl,
        additionalImageUrl,
      });
    }


  @Get()
  async findAll(): Promise<Summary[]> {
    return this.summaryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Summary> {
    return this.summaryService.findOne(id);
  }

  //Pourquoi patch et non Put ? car patch pour modif partielle, avec put, qui sont pas modifiés seront null
  @Patch(':id')
  @UseInterceptors(CustomFileFieldsInterceptor())
  async update(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
    @Body() dto: Partial<SummaryDto>,
  ): Promise<Summary> {
    const imageUrl = files.file?.[0]
      ? `http://localhost:5000/uploads/${files.file[0].filename}`
      : undefined;

    const additionalImageUrl = files.additionalImages?.map(
      (f) => `http://localhost:5000/uploads/${f.filename}`,
    );

    return this.summaryService.update(id, {
      ...dto,
      ...(imageUrl && { imageUrl }),
      ...(additionalImageUrl && additionalImageUrl.length > 0 && { additionalImageUrl }),
    });
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.summaryService.remove(id);
  }

   
}
