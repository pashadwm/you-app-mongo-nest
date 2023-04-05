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
    const user = await this.userModel.findOne({ username: username }).exec();
    const mail = await this.userModel.findOne({ email: email }).exec();
    if (user || mail) {
      throw new UnprocessableEntityException('Username or Email already exist');
    }
    const newUser = new this.userModel({
      username: username,
      email: email,
      password: password,
    });
    const result = await newUser.save();
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

  async getSingleUser(username: string, password: string) {
    this.logger.log(`Returning user with id: ${username}`);
    let user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      user = await this.userModel.findOne({ email: username }).exec();
    }

    if (user) {
      if (user.password != password) {
        throw new UnprocessableEntityException('Wrong Password');
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        gender: user.gender,
        birthday: user.birthday,
        age: user.age,
        horoscope: user.horoscope,
        zodiac: user.zodiac,
        height: user.height,
        heightUnit: user.heightUnit,
        weight: user.weight,
      };
    }
    throw new NotFoundException('Could not find user');
    // console.log(a);
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

  async updateUser(
    // id: string,
    username: string,
    email: string,
    password: string,
    displayName: string,
    gender: string,
    birthday: string,
    age: string,
    horoscope: string,
    zodiac: string,
    height: string,
    heightUnit: string,
    weight: string,
  ) {
    // this.logger.log(`Updating user with id: ${id}`);
    const updatedUser = await this.userModel
      .findOne({ username: username })
      .exec();
    console.log(updatedUser);
    // const updatedUser = await this.findUser(id);
    if (!updatedUser) {
      throw new NotFoundException('Could not find user');
    }
    // if (username) {
    //   updatedUser.username = username;
    // }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (displayName) {
      updatedUser.displayName = displayName;
    }
    if (gender) {
      updatedUser.gender = gender;
    }
    if (birthday) {
      updatedUser.birthday = birthday;
    }
    if (age) {
      updatedUser.age = age;
    }
    if (horoscope) {
      updatedUser.horoscope = horoscope;
    }
    if (zodiac) {
      updatedUser.zodiac = zodiac;
    }
    if (height) {
      updatedUser.height = height;
    }
    if (heightUnit) {
      updatedUser.heightUnit = heightUnit;
    }
    if (weight) {
      updatedUser.weight = weight;
    }
    updatedUser.save();
    return updatedUser;
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
