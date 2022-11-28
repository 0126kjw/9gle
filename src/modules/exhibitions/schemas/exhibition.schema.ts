import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ExhibitionDocument = Exhibition & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Exhibition {
  @Prop()
  title: string;

  @Prop()
  imgSrc: string;

  @Prop()
  href: string;

  @Prop()
  place: string;

  @Prop()
  period: String[];
}

export const ExhibitionSchema = SchemaFactory.createForClass(Exhibition);
ExhibitionSchema.index({ title: 'text', place: 'text' });
