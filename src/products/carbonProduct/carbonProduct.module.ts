import { Module } from '@nestjs/common';
import { CarbonProductService } from './carbonProduct.service';
import { CarbonProductController } from './carbonProduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carbon, CarbonSchema } from 'src/models/products/carbon.schema/carbon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Carbon.name, schema: CarbonSchema },
          ])
        ],
  providers: [CarbonProductService],
  controllers: [CarbonProductController]
})
export class CarbonProductModule {}
