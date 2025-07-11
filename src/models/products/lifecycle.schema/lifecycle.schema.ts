import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from '../status.enum';

export type LifeCycleDocument = LifeCycle & Document;

@Schema()
export class LifeCycle {

 @Prop({ enum: Status, required: true})
  currentStatus: Status;

  @Prop({ type: Number, required: true})
  cycleCount : number

  @Prop({ type: Number, required: true})
  StateOfHealth : number

  @Prop({ required: true})
  SecondLifeInfo : string

  @Prop()
  IsDraft: boolean; 

  @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
  summaryId: string;


}

export const LifeCycleSchema = SchemaFactory.createForClass(LifeCycle);
