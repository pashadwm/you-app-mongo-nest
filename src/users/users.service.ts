import {
  Injectable,
  NotFoundException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private readonly logger = new Logger(UsersService.name);

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

  async getAllUsers() {
    this.logger.log('Returning all users');
    const users = await this.userModel.find().exec();
    console.log(users);
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    }));
  }

  async getSingleUser(id: string) {
    this.logger.log(`Returning post with id: ${id}`);
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
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

  async updateUser(
    id: string,
    username: string,
    email: string,
    password: string,
  ) {
    this.logger.log(`Updating user with id: ${id}`);
    // const updatedUser = await this.userModel.findById(id);
    // console.log(updatedUser);
    const updatedUser = await this.findUser(id);
    if (!updatedUser) {
      throw new NotFoundException('Could not find user');
    }
    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  async deleteUser(id: string) {
    this.logger.log(`Deleting user with id: ${id}`);
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    console.log(result);

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user');
    }
  }
}
