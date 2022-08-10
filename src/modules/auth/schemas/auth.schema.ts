import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop({ type: String, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ type: String, trim: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
