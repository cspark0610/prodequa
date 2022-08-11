import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private parseDni(dni: string): number {
    return parseInt(dni.replace(/[^0-9]/g, ''), 10);
  }

  async create(userDto: UserDto): Promise<User> {
    const userExists = await this.usersRepository.findUserByDNI(userDto.dni);

    if (userExists) {
      throw new ConflictException(
        ` User with dni ${userExists.dni} already exists`,
      );
    }
    const nUsers: number = await this.usersRepository.countDocuments();
    return this.usersRepository.create({
      ...userDto,
      dni: this.parseDni(userDto.dni),
      userCode: nUsers + 1,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async getUserByDNI(dni: string): Promise<User> {
    const userExists = await this.usersRepository.findUserByDNI(dni);
    if (!userExists) {
      throw new ConflictException(` User with dni ${dni} does not exists`);
    }
    return userExists;
  }

  async softDeleteUser(userCode: number): Promise<User> {
    const userExists = await this.usersRepository.findUserByUserCode(userCode);
    if (!userExists) {
      throw new ConflictException(
        ` User with dni ${userExists.dni} not exists`,
      );
    }
    return this.usersRepository.findOneAndUpdate(
      { userCode },
      { deleted: true },
    );
  }

  async restoreUser(userCode: number): Promise<User> {
    const userExists = await this.usersRepository.findUserByUserCode(userCode);
    if (!userExists) {
      throw new ConflictException(
        ` User with dni ${userExists.dni} not exists`,
      );
    }
    return this.usersRepository.findOneAndUpdate(
      { userCode },
      { deleted: false },
    );
  }

  async updateUser(userDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findUserByDNI(userDto.dni);
    if (!user) {
      throw new ConflictException(` User with dni ${userDto.dni} not exists`);
    }
    return this.usersRepository.findOneAndUpdate(
      { dni: this.parseDni(userDto.dni) },
      { ...userDto, dni: this.parseDni(userDto.dni) },
    );
  }
}
