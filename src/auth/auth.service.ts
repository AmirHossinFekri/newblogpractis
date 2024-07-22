import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/user/schema/user.schema';
import { userRegisterDto } from './dto/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private userModel: Model<user>,
    private jwtService: JwtService,
  ) {}

  async userRegister(userData: userRegisterDto) {
    const { email, username, password } = userData;
    try {
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({
        email,
        username,
        password: hash,
      });
      return new HttpException(
        'ثبت نام با موفقیت انجام شد',
        HttpStatus.CREATED,
      );
    } catch (err) {
      throw new Error('مشکلی از سمت سرور وجود دارد' + err);
    }
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email });

    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { _id, username, email, createdAt } = user.toObject();
      return { _id, username, email, createdAt };
    }
    return null;
  }

  async userLogin(user: any) {
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
