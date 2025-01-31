import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
    @Field(() => String)
    @Prop({ type: String, default: () => new mongoose.Types.ObjectId() })
    _id: string | Types.ObjectId;

    @Field(() => String, { nullable: true })
    @Prop()
    model: string;

    @Field(() => Number, { nullable: true })
    @Prop()
    speed: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
