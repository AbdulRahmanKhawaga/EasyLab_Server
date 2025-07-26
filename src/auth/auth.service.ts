// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  
async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersRepository.findOne({ where: { email } });

  if (!user) throw new UnauthorizedException('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

  const { password_hash, ...result } = user;
  return result;
}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
