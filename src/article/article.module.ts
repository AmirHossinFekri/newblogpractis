import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema } from './schema/article.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'article', schema: articleSchema }]),
    UserModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, UserService],
})
export class ArticleModule {}
