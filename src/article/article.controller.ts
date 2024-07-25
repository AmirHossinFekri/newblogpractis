import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleDto } from './dto/article.dto';
import { User } from 'src/user/user.decorator';
import { Public } from 'src/public-route/public-route.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/')
  async postNewArticle(@Body() articleData: articleDto, @User() user: any) {
    return await this.articleService.postNewArticle(articleData, user);
  }

  @Public()
  @Get('/')
  async getAllPublished() {
    return await this.articleService.getAllPublishedArticles();
  }
}
