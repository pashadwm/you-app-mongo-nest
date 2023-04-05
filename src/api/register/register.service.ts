import {
  Injectable,
  NotFoundException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/user.entity';

@Injectable()
export class RegisterService {
  private users: User[] = [];
  private readonly logger = new Logger(RegisterService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(username: string, email: string, password: string) {
    this.logger.log(`Creating User: ${username} with email ${email}`);
    const newUser = new this.userModel({
      username: username,
      email: email,
      password: password,
    });
    const result = await newUser.save();
    // this.users.push(newUser);
    console.log(result);
    return newUser;
  }

  async getSingleUser(id: string) {
    this.logger.log(`Returning post with id: ${id}`);
    const a = await this.userModel.find({ password: id }).exec();
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    console.log(a);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }
  private async findUser(id: string): Promise<User> {
    let user;
    try {
      // user = await this.userModel.find({ password: id }).exec();
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    // const user = await this.userModel.findById(id);
    // if (!user) {
    //   throw new NotFoundException('Could not find user');
    // }
    return user;
  }
}
