import { IsEnum, IsMongoId, IsNumber, IsString} from 'class-validator';
import { Status } from 'src/models/products/status.enum';

export class LifeCycleDto {

     @IsEnum(Status)
     currentStatus: Status

     @IsNumber()
     cycleCount?: number;
     
     @IsNumber()
     StateOfHealth?: number;

     @IsString()
     SecondLifeInfo?: string

     @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
     summaryId: string;
}
