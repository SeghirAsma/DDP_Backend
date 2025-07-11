import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/users.dto/users.dto';
import { Role } from 'src/models/users/role.enum';

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    const existing = await this.usersService.findByEmail(userDto.email);
    if (existing) {
      throw new BadRequestException('Email déjà utilisé');
    }

    const user = await this.usersService.create(userDto);
    return {
      message: 'Utilisateur créé avec succès',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role : user.role
      },
    };
  }
}
