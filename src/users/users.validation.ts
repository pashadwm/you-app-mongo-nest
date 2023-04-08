import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { sign } from 'jsonwebtoken';

export class MiddleService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: any) {
    // token to expire in 12 hours
    let token = sign(payload, 'secretKey', { expiresIn: '12h' });
    return token;
  }

  async validateUser(payload: any) {
    return await this.usersService.findByPayload(payload);
  }
}
