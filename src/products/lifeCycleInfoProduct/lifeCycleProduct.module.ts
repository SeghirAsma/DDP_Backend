import { Module } from '@nestjs/common';
import { LifeCycleProductService } from './lifeCycleProduct.service';
import { LifeCycleProductController } from './lifeCycleProduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LifeCycle, LifeCycleSchema } from 'src/models/products/lifecycle.schema/lifecycle.schema';

@Module({
   imports: [
      MongooseModule.forFeature([
          { name: LifeCycle.name, schema: LifeCycleSchema },
            ])
          ],
  providers: [LifeCycleProductService],
  controllers: [LifeCycleProductController]
})
export class LifeCycleProductModule {}
