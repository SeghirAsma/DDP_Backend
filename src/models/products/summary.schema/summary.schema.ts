import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IndustryClassification } from '../industry.enum';
import { PCB_Category } from '../PCBcategory.enum';
import { Manufacturer } from '../manufacturer.enum';
import { Manufacturing_Location } from '../manufacturingLocation.enum';
import { Document } from 'mongoose';

export type SummaryDocument = Summary & Document;

@Schema()
export class Summary {
     @Prop({ type: String, required: true }) Productid: string;

 @Prop({ required: true})
  ProductName : string

 @Prop({ enum: IndustryClassification, required: true})
  industryClassification: IndustryClassification;

 @Prop({ enum: PCB_Category, required: true})
  category: PCB_Category;

  @Prop({ enum: Manufacturer, required: true})
  Manufacturer: Manufacturer;

  @Prop({ enum: Manufacturing_Location, required: true})
  Manufacturing_Location: Manufacturing_Location;
  
  @Prop({ type: Date , required: true})
  Production_Date: Date;

   @Prop({ required: true})
   Short_Description : string

   @Prop({ required: true})
   imageUrl: string;

   @Prop([String])
   additionalImageUrl: string[]; 
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
