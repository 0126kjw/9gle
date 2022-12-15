import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  period: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ExhibitionSchema = SchemaFactory.createForClass(Exhibition);
ExhibitionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24시간이후 자동 삭제
ExhibitionSchema.index({ title: 'text', place: 'text' });
