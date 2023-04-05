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
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { RegisterService } from './register.service';

@Controller('users')
@ApiTags('users')
@UseFilters(HttpExceptionFilter)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // @Post()
  // insertUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.insertUser('Pasha', 'psdm@gmail.com', 'psdm');
  // }

  @Get('')
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'User title already exists.' })
  async insertUser(
    @Param('username') userName: string,
    @Param('email') userEmail: string,
    @Param('password') userPassword: string,
    // @Body('username') userName: string,
    // @Body('email') userEmail: string,
    // @Body('password') userPassword: string,
  ) {
    const generatedId = await this.registerService.insertUser(
      userName,
      userEmail,
      userPassword,
    );
    return { id: generatedId };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  getUser(@Param('id') id: string) {
    return this.registerService.getSingleUser(id);
  }
}
