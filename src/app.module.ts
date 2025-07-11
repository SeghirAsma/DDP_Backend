import { Module } from '@nestjs/common';
import { SummaryModule } from './products/summaryProducts/summary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecyclePoductModule } from './products/recycleProduct/recycle.module';
import { CarbonProductModule } from './products/carbonProduct/carbonProduct.module';
import { LifeCycleProductModule } from './products/lifeCycleInfoProduct/lifeCycleProduct.module';
import { TraceabilityProductModule } from './products/traceabilityProduct/traceabilityProduct.module';
import { CertificationProductModule } from './products/certificationProduct/certificationProduct.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TechnicalProductModule } from './products/technicalProduct/technicalProduct.module';
import { BombillModule } from './products/bombill/bombill.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI', { infer: true }),
      }),
    }),
      SummaryModule, RecyclePoductModule, CarbonProductModule, LifeCycleProductModule, TraceabilityProductModule,
    CertificationProductModule, UsersModule, AuthModule, TechnicalProductModule, BombillModule],
  controllers: [],
  providers: [ ],
  
})
export class AppModule {}
