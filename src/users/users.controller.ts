import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // insertUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.insertUser('Pasha', 'psdm@gmail.com', 'psdm');
  // }

  @Post()
  async insertUser(
    @Body('username') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userName,
      userEmail,
      userPassword,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getSingleUser(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    await this.usersService.updateUser(id, username, email, password);
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return null;
  }
}
