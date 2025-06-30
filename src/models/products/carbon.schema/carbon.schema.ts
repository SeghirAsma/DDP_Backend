import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CarbonDocument = Carbon & Document;

@Schema()
export class Carbon {
    @Prop({ type: Number, required: true})
    Raw_Material_Extraction : number

    @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
    summaryId: string;
}

export const CarbonSchema = SchemaFactory.createForClass(Carbon);