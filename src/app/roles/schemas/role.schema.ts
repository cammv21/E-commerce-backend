import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Resources } from "../enums/resource.enum";
import { Actions } from "../enums/actions.enum";

@Schema()
class Permission {
    @Prop({ required: true, enum: Resources })
    resource: Resources;

    @Prop({ required: true, enum: Actions })
    description: Actions;
}

@Schema()
class Role {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, type: [Permission] })
    permissions: Permission[];

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);

export type RoleModel = Model<RoleDocument>