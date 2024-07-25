import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleDto } from './dto/article.dto';
import { User } from 'src/user/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/')
  async postNewArticle(@Body() articleData: articleDto, @User() user: any) {
    return await this.articleService.postNewArticle(articleData, user);
  }
}
