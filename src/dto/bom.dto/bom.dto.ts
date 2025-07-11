import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsString} from 'class-validator';
import { CertifDoc } from 'src/models/products/certifDoc.enum';
import { CompliantRegulation } from 'src/models/products/compliantRegulations.enum';
import { Material } from 'src/models/products/material.enum';
import { StandardFollowed } from 'src/models/products/stdFollowed.enum';
import { Supplier } from 'src/models/products/supplier.enum';

export class BomDto {

     @IsEnum(Material)
     material?: Material

     @IsEnum(Supplier)
     supplier?: Supplier

     @IsString()
     bomUrl?: string;
     
     @IsString()
     componentName?: string;

     @IsNumber()
     weight?: number

     @IsNumber()
     mass?: number;

     @IsString()
     bomCertUrl?: string;

     @IsBoolean()
     recyclable?: boolean;

     @IsBoolean()
     IsDraft: boolean; 

     @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
     summaryId: string;
}
