import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put('/:id')
  async updateArticle(
    @Body() updatedArticle: articleDto,
    @User() user: any,
    @Param('id') id: string,
  ) {
    return await this.articleService.UpdateArticle(id, user, updatedArticle);
  }

  @Delete('/:id')
  async deleteArticle(@User() user: any, @Param('id') id: string) {
    return this.articleService.DeleteArticle(id, user);
  }

  @Public()
  @Get('/')
  async getAllPublished() {
    return await this.articleService.getAllPublishedArticles();
  }
}
