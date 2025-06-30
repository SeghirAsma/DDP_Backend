import { Module } from '@nestjs/common';
import { SummaryModule } from './products/summaryProducts/summary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecyclePoductModule } from './products/recycleProduct/recycle.module';
import { CarbonProductModule } from './products/carbonProduct/carbonProduct.module';
import { LifeCycleProductModule } from './products/lifeCycleInfoProduct/lifeCycleProduct.module';
import { TraceabilityProductModule } from './products/traceabilityProduct/traceabilityProduct.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI', { infer: true }),
      }),
    }),
      SummaryModule, RecyclePoductModule, CarbonProductModule, LifeCycleProductModule, TraceabilityProductModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
