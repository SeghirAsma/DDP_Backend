import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecycleDocument = Recycle & Document;

@Schema()
export class Recycle {

 @Prop({ type: Number, required: true})
  RecycledContent : number

 @Prop({required: true})
  MaterialSources: string;

 @Prop({ type: Number, required: true})
  Rating: number;

  @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
  summaryId: string;

}

export const RecycleSchema = SchemaFactory.createForClass(Recycle);
