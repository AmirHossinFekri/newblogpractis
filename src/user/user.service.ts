import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}

  async findOneByEmail(email: string) {
    try {
      const userByEmail = await this.userModel.findOne({ email });
      console.log(userByEmail);

      if (userByEmail) return userByEmail;

      throw new HttpException(
        'مشکلی از سمت سرور وجود دارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'مشکلی از سمت سرور وجود دارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
