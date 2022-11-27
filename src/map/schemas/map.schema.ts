import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MapDocument = Map & Document;

@Schema()
export class Map {
  @Prop()
  _id: string;

  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop()
  pins: Array<object>;

  @Prop()
  crs: string[];

  @Prop()
  features: Array<object>;

  @Prop()
  center: Array<object>;
}

export const MapSchema = SchemaFactory.createForClass(Map);
