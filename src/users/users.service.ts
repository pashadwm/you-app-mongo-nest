import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async insertUser(username: string, email: string, password: string) {
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
    const user = await this.findUser(id);
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
    const updatedUser = await this.findUser(id);
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
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    console.log(result);

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user');
    }
  }
}
