import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ unique: true, required: true, minlength: 3 })
  title: String;

  @Prop({ required: true })
  author: String;

  @Prop({ default: null })
  createdAt: Date;
}

export const bookShema = SchemaFactory.createForClass(Book);
