import { IsString, IsMongoId,} from 'class-validator';

export class TraceabilityDto {
  @IsString()
  TraceabilityInfoLink: string;

  @IsString()
  TraceabilityInformation: string;

  @IsString()
  fileTraceabilityUrl?: string;

  @IsMongoId({ message: 'summaryId must be a valid MongoDB ObjectId' })
  summaryId: string;
}
