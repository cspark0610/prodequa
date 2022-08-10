import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, Status } from '../enums';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  dni!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday!: Date;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: `please enter ${Gender.MASCULINE} or ${Gender.FEMENINE}`,
  })
  gender!: Gender;

  @IsNotEmpty()
  @IsEnum(Status, {
    message: `please enter ${Status.MARRIED} or ${Status.SINGLE}`,
  })
  status!: Status;

  @IsOptional()
  deleted?: boolean;
}
