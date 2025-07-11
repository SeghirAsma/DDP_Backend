import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TraceabilityDocument = Traceability & Document;

@Schema()
export class Traceability {

 @Prop({ required: true})
  TraceabilityInfoLink : string

 @Prop({required: true})
  TraceabilityInformation: string;

 @Prop({ required: true})
  fileTraceabilityUrl: string;

  @Prop()
   IsDraft: boolean; 

  @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
  summaryId: string;

}

export const TraceabilitySchema = SchemaFactory.createForClass(Traceability);
