import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseBaseRepository } from '../../common/repositories/mongoose.base-repository';
import { Auth } from './schemas/auth.schema';

@Injectable()
export class AuthRepository extends MongooseBaseRepository<Auth> {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {
    super(authModel);
  }

  async findAuthRecordByEmail(email: string) {
    return this.authModel.findOne({ email });
  }
}
