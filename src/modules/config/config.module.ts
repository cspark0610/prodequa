import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';
import mongoConfiguration from 'src/configuration/mongo.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      load: [mongoConfiguration],
    }),
  ],
})
export class ConfigModule {}
