import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/user/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'VmnRVObghAJP7EGquQSELJXtDLxM8Cl8',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, localStrategy],
})
export class AuthModule {}
