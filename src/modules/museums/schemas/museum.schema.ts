import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MuseumDocument = Museum & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
@Schema()
export class Museum {
  @Prop()
  _id: string;

  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  runby: string;

  @Prop()
  category: string;

  @Prop()
  newAddress: string;

  @Prop()
  oldAddress: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  contactInfo: string;

  @Prop()
  institution: string;

  @Prop()
  website: string;

  @Prop()
  facilities: string;

  @Prop()
  mon: string;

  @Prop()
  tue: string;

  @Prop()
  wed: string;

  @Prop()
  thu: string;

  @Prop()
  fri: string;

  @Prop()
  sat: string;

  @Prop()
  sun: string;

  @Prop()
  offday: string;

  @Prop()
  isFree: boolean;

  @Prop()
  adultFee: string;

  @Prop()
  youthFee: string;

  @Prop()
  childFee: string;

  @Prop()
  feeUrl: string;

  @Prop()
  description: string;

  @Prop()
  srcName: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MuseumSchema = SchemaFactory.createForClass(Museum);
MuseumSchema.index({ name: 'text' });
