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

  @Get('/register')
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

  @Post('/login/:username')
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  getUser(
    @Param('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.getSingleUser(username, password);
  }

  @Get('/getProfile/:id')
  @ApiOkResponse({ description: 'Profile retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Profile not found.' })
  getProfile(@Param('id') id: string) {
    return this.usersService.getSingleProfile(id);
  }

  @Post('/updateProfile/:username')
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Username already exists.' })
  async update(
    @Param('username') username: string,
    // @Body('id') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('displayName') displayName: string,
    @Body('gender') gender: string,
    @Body('birthday') birthday: string,
    @Body('age') age: string,
    @Body('horoscope') horoscope: string,
    @Body('zodiac') zodiac: string,
    @Body('height') height: string,
    @Body('heightUnit') heightUnit: string,
    @Body('weight') weight: string,
  ) {
    const result = await this.usersService.updateUser(
      username,
      email,
      password,
      displayName,
      gender,
      birthday,
      age,
      horoscope,
      zodiac,
      height,
      heightUnit,
      weight,
    );
    return result;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async delete(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return null;
  }
}
