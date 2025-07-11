import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email non trouvé');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Mot de passe incorrect');

    const { password: _, ...result } = user as any;
    return result;
  }

  async login(user: any) {
   const payload = {
    email: user._doc.email,
    sub: user._doc._id.toString(), 
    role: user._doc.role,
  };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
