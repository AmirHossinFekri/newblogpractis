import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [UserModule, MongoModule, AuthModule, ArticleModule],
})
export class AppModule {}
