import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/modules/auth/guards/access-token.guard';
import { User } from './schemas/user.schema';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:dni')
  @HttpCode(HttpStatus.OK)
  async getUserByDNI(@Param('dni') dni: string) {
    return this.usersService.getUserByDNI(dni);
  }

  @Patch('/:userCode')
  @HttpCode(HttpStatus.OK)
  async softDeleteUser(@Param('userCode') userCode: string) {
    return this.usersService.softDeleteUser(Number(userCode));
  }

  @Patch('/:userCode/restore')
  @HttpCode(HttpStatus.OK)
  async restoreUser(@Param('userCode') userCode: string) {
    return this.usersService.restoreUser(Number(userCode));
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() userDto: UserDto) {
    return this.usersService.updateUser(userDto);
  }

  @Delete('/:dni')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('dni') dni: string) {
    return this.usersService.deleteUser(dni);
  }
}
