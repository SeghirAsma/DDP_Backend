import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Material } from '../material.enum';
import { Supplier } from '../supplier.enum';

export type BomDocument = Bom & Document;

@Schema()
export class Bom {
 
    @Prop()
    bomUrl?: string;

    @Prop()
    componentName? : string

    @Prop() 
    weight?: number;

    @Prop() 
    mass?: number;

    @Prop()
    bomCertUrl?: string;

    @Prop()
    recyclable?: boolean;

    @Prop({ enum: Material})
    material?: Material;

    @Prop({ enum: Supplier})
    supplier?: Supplier;

    @Prop()
    IsDraft: boolean; 

    @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
    summaryId: string;

 
}

export const BomSchema = SchemaFactory.createForClass(Bom);
