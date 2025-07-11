import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()

export class Auth {

    @Prop()
    email : string

    @Prop()
    password: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);
