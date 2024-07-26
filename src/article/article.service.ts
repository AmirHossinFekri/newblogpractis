import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    return this.articleModel.find({ isPublished: true }).lean().exec();
  }

  async UpdateArticle(id: string, user: any, updatedArticle: articleDto) {
    const article = await this.articleModel.findOne({ _id: id });

    if (!article)
      throw new HttpException('مقاله یافت نشد', HttpStatus.NOT_FOUND);

    if (JSON.stringify(article.author) !== JSON.stringify(user.userId))
      throw new UnauthorizedException('شما صاحب این پست نیستید');

    article.title = updatedArticle.title;
    article.description = updatedArticle.description;
    article.updatedAt = new Date();
    await article.save();
    return new HttpException('آبدیت شد', HttpStatus.CREATED);
  }

  async DeleteArticle(id: string, user: any) {
    const article = await this.articleModel.findById(id);

    if (!article)
      throw new HttpException('مقاله یافت نشد', HttpStatus.NOT_FOUND);

    if (JSON.stringify(article.author) !== JSON.stringify(user.userId))
      throw new UnauthorizedException('شما صاحب این پست نیستید');

    await this.articleModel.deleteOne({ _id: id });

    return new HttpException('حذف شد', HttpStatus.OK);
  }
}
