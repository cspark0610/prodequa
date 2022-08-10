import { FilterQuery, Model, Document } from 'mongoose';

export abstract class MongooseBaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filterQuery);
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id, { __v: 0 });
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery, { __v: 0 }, { lean: true });
  }

  async create(createModelData: Omit<T, '_id'>): Promise<T> {
    const model = new this.model(createModelData);
    return (await model.save()).toJSON() as unknown as T;
  }

  async update(updateModelData: { [P in keyof T]: any }) {
    return this.model.updateOne(updateModelData, { __v: 0 });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T> = {},
    updateModelData: Partial<T>,
  ): Promise<T> {
    return this.model.findOneAndUpdate(filterQuery, updateModelData, {
      new: true,
      lean: true,
      __v: 0,
    });
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery, { __v: 0 });
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(filterQuery, { __v: 0 });
    return deleteResult.deletedCount >= 1;
  }
}
