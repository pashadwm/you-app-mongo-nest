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
import { MiddleService } from './users.validation';
import { LoginDTO, ProfileDTO, RegisterDTO } from './users.dto';

@Controller('users')
@ApiTags('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private middleService: MiddleService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully.' })
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.usersService.create(userDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.middleService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.usersService.findByLogin(userDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.middleService.signPayload(payload);
    return { user, token };
  }

  @Post('/updateProfile')
  async update(@Body() userDTO: ProfileDTO) {
    const user = await this.usersService.updateByLogin(userDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.middleService.signPayload(payload);
    return { user, token };
  }

  @Get('/getProfile/:id')
  @ApiOkResponse({ description: 'Profile retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Profile not found.' })
  getProfile(@Param('id') id: string) {
    return this.usersService.getSingleProfile(id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async delete(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return null;
  }
}
