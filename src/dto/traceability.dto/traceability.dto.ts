import { IsString, IsMongoId, IsBoolean,} from 'class-validator';

export class TraceabilityDto {
  @IsString()
  TraceabilityInfoLink: string;

  @IsString()
  TraceabilityInformation: string;

  @IsString()
  fileTraceabilityUrl?: string;

  @IsBoolean()
  IsDraft: boolean; 

  @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
  summaryId: string;
}
