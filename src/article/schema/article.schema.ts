import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { user } from 'src/user/schema/user.schema';

export type articleDocument = HydratedDocument<article>;

@Schema()
export class article {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  author: user;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const articleSchema = SchemaFactory.createForClass(article);
