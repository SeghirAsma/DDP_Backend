import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CertifDoc } from '../certifDoc.enum';
import { CompliantRegulation } from '../compliantRegulations.enum';
import { StandardFollowed } from '../stdFollowed.enum';

export type CertificationDocument = Certification & Document;

@Schema()
export class Certification {

    @Prop({ enum: CertifDoc})
    certifDoc : CertifDoc

    @Prop({ enum: CompliantRegulation})
    compliantRegulation: CompliantRegulation;

    @Prop({ enum: StandardFollowed})
    standardFollowed: StandardFollowed;

    @Prop()
    additionalCertif : string

    @Prop()
    complianceNotes: string;

    @Prop()
    safetyNotes: string;

    @Prop({ required: true})
    certifUrl: string;

    @Prop()
    IsDraft: boolean; 

    @Prop({ type: Types.ObjectId, ref: 'Summary', required: true })
    summaryId: string;
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
