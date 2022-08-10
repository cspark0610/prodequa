import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Number, unique: true })
  userCode: number;

  @Prop({ type: String, trim: true, lowercase: true })
  firstName: string;

  @Prop({ type: String, trim: true, lowercase: true })
  lastName: string;

  @Prop({ type: Number, unique: true })
  dni: number;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
