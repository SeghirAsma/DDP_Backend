import { Module } from '@nestjs/common';
import { TraceabilityProductService } from './traceabilityProduct.service';
import { TraceabilityProductController } from './traceabilityProduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Traceability, TraceabilitySchema } from 'src/models/products/traceability.schema/traceability.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Traceability.name, schema: TraceabilitySchema }
      ])
    ],
  providers: [TraceabilityProductService],
  controllers: [TraceabilityProductController]
})
export class TraceabilityProductModule {}
