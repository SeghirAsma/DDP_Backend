import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bom, BomSchema } from 'src/models/products/bom.schema/bom.schema';
import { BombillService } from './bombill.service';
import { BombillController } from './bombill.controller';

@Module({
     imports: [
        MongooseModule.forFeature([
            { name: Bom.name, schema: BomSchema },
              ])
            ],
      providers: [BombillService],
      controllers: [BombillController]
})
export class BombillModule {
    
}
