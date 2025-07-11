import { Module } from '@nestjs/common';
import { CertificationProductController } from './certificationProduct.controller';
import { CertificationProductService } from './certificationProduct.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Certification, CertificationSchema } from 'src/models/products/certifications.schema/certification.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Certification.name, schema: CertificationSchema }
        ])
      ],
  controllers: [CertificationProductController],
  providers: [CertificationProductService]
})
export class CertificationProductModule {}
