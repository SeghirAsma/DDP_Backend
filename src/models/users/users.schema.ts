import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    email : string

    @Prop()
    password: string;

    @Prop()
    firstName : string

    @Prop()
    lastName: string;

    @Prop({ enum: Role, required: true})
    role: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);
