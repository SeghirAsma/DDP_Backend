import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Summary, SummarySchema } from 'src/models/products/summary.schema/summary.schema';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: Summary.name, schema: SummarySchema }
    ])
  ],
  providers: [SummaryService],
  controllers: [SummaryController]
})
export class SummaryModule {}
