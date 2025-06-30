import { IsMongoId, IsNumber, IsString} from 'class-validator';

export class CarbonDto {

     @IsNumber({})
     Raw_Material_Extraction?: number

     @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
     summaryId: string;
}
