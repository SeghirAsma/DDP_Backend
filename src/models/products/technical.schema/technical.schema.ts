import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseMaterial } from '../baseMaterial.enum';
import { FlameRetardancy } from '../flameRetardancy.enum';
import { SurfaceFinish } from '../surfaceFinish.enum';

export type TechnicalDocument = Technical & Document;

@Schema()
export class Technical {

 @Prop({ required: true})
  weight : number

 @Prop({required: true})
  numberOfLayers: number;

  @Prop({ enum: BaseMaterial})
  baseMaterial: BaseMaterial;

  @Prop({ enum: FlameRetardancy})
  flameRetardancy: FlameRetardancy;

  @Prop({ enum: SurfaceFinish})
  surfaceFinish: SurfaceFinish;

  @Prop({ required: true})
  tg: number;

  @Prop({ required: true})
  total_PCB_Thickness: number;

  @Prop({ required: true})
  copper_Thickness: number;

  @Prop({ required: true})
  dielectric_Constant: number;

  @Prop({ required: true})
  range_Temperature: number;

  @Prop({ required: true})
  max_Current_Carrying: number;

  @Prop()
  controlled_Impedance_Supported: boolean;

   @Prop()
   IsDraft: boolean; 

  @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
  summaryId: string;

}

export const TechnicalSchema = SchemaFactory.createForClass(Technical);
