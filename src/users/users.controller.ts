import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // insertUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.insertUser('Pasha', 'psdm@gmail.com', 'psdm');
  // }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'User title already exists.' })
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
  @ApiOkResponse({ description: 'Users retrieved successfully.' })
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  getUser(@Param('id') id: string) {
    return this.usersService.getSingleUser(id);
  }

  @Post(':id')
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Username already exists.' })
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
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async delete(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return null;
  }
}
