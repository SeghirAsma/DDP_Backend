import { IsBoolean, IsEnum, IsMongoId, IsString} from 'class-validator';
import { CertifDoc } from 'src/models/products/certifDoc.enum';
import { CompliantRegulation } from 'src/models/products/compliantRegulations.enum';
import { StandardFollowed } from 'src/models/products/stdFollowed.enum';

export class CertifDto {

     @IsEnum(CertifDoc)
     certifDoc: CertifDoc

     @IsEnum(CompliantRegulation)
     compliantRegulation: CompliantRegulation

     @IsEnum(StandardFollowed)
     standardFollowed: StandardFollowed

     @IsString()
     additionalCertif?: string;
     
     @IsString()
     complianceNotes?: string;

     @IsString()
     safetyNotes?: string

      @IsString()
     certifUrl?: string;

     @IsBoolean()
     IsDraft: boolean; 

     @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
     summaryId: string;
}
