import { IsBoolean, IsMongoId, IsNumber, IsString} from 'class-validator';

export class RecycleDto {

     @IsNumber({})
     RecycledContent?: number

     @IsString()
     MaterialSources?: string;
     
     @IsNumber({})
     Rating?: number;

     @IsBoolean()
     IsDraft: boolean; 

     @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
     summaryId: string;
}
