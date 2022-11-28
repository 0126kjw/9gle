import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MuseumDocument = Museum & Document;

// @Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
@Schema()
export class Museum {
  @Prop()
  facility_name: string;

  @Prop()
  division: string;

  @Prop()
  raod_address: string;

  @Prop()
  land_address: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  office_phone: string;

  @Prop()
  office_name: string;

  @Prop()
  office_site: string;

  @Prop()
  weekday_start: string;

  @Prop()
  weekday_end: string;

  @Prop()
  holiday_start: string;

  @Prop()
  holiday_end: string;

  @Prop()
  closure: string;

  @Prop()
  adult_admission_fee: string;

  @Prop()
  youth_admission_fee: string;

  @Prop()
  child_admission_fee: string;

  @Prop()
  etc_admission_fee_info: string;

  // @Prop()
  // createdAt: string;

  // @Prop()
  // updatedAt: string;
}

export const MuseumSchema = SchemaFactory.createForClass(Museum);
MuseumSchema.index({ facility_name: 'text' });
