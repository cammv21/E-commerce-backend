import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, SchemaTypes, Types } from "mongoose";

@Schema()
class User{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId })
    roleId: Types.ObjectId;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<UserDocument>