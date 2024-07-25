import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { article } from './schema/article.schema';
import { Model } from 'mongoose';
import { articleDto } from './dto/article.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ArticleService {
  constructor(
    private userService: UserService,
    @InjectModel(article.name) private articleModel: Model<article>,
  ) {}

  async postNewArticle(articleData: articleDto, user: any) {
    try {
      const newArticle = new this.articleModel();
      newArticle.title = articleData.title;
      newArticle.description = articleData.description;
      newArticle.author = user.userId;
      newArticle.isPublished = false;

      newArticle.createdAt = new Date();
      newArticle.updatedAt = new Date();

      await newArticle.save();
      return newArticle;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'مشکلی از سمت سرور وجود دارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPublishedArticles() {
    const articles = await this.articleModel.find({ isPublished: true });
  }
}
