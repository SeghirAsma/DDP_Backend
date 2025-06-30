import { Module } from '@nestjs/common';
import { RecycleController } from './recycle.controller';
import { RecycleService } from './recycle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recycle, RecycleSchema } from 'src/models/products/recycle.schema/recycle.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Recycle.name, schema: RecycleSchema },
      ])
    ],
  controllers: [RecycleController],
  providers: [RecycleService]
})
export class RecyclePoductModule {}
