import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MongoModule, AuthModule],
})
export class AppModule {}
