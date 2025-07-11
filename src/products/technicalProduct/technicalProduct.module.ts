import { Module } from '@nestjs/common';
import { TechnicalProductService } from './technicalProduct.service';
import { TechnicalProductController } from './technicalProduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Technical, TechnicalSchema } from 'src/models/products/technical.schema/technical.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Technical.name, schema: TechnicalSchema }
      ])
    ],
  providers: [TechnicalProductService],
  controllers: [TechnicalProductController]
})
export class TechnicalProductModule {}
