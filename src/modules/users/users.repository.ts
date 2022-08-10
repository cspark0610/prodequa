import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseBaseRepository } from 'src/common/repositories/mongoose.base-repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends MongooseBaseRepository<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async countDocuments(): Promise<number> {
    return this.userModel.countDocuments();
  }

  async findUserByDNI(dni: string): Promise<User> {
    return this.userModel.findOne({ dni: Number(dni) });
  }

  async findUserByUserCode(userCode: number): Promise<User> {
    return this.userModel.findOne({ userCode });
  }
}
