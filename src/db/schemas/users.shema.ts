import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import isEmail from 'validator/lib/isEmail';
import { Document, Model } from 'mongoose';
import { Book, BookDocument } from './books.shema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true, minlength: 3 })
  name: String;

  @Prop({ unique: true, required: true, validate: [isEmail, 'invalid email'] })
  email: String;

  @Prop({ required: true, minlength: 6 })
  password: String;

  @Prop({ default: null })
  books: [BookDocument];

  @Prop({ default: null })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;
}

export const userShema = SchemaFactory.createForClass(User);
