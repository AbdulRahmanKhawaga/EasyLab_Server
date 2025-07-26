import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
    return this.userService.update(Number(id), userData);
  }
// ✅ ADD THIS
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(+id, updateData);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.remove(Number(id));
    return { message: 'User deleted successfully' };
  }
}
