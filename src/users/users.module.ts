import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddleService } from './users.validation';
import { userSchema } from './users.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService, MiddleService, JwtStrategy],
  exports: [MiddleService],
})
export class UsersModule {}
