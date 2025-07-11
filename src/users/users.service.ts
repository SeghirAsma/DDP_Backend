import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/users.dto/users.dto';
import { User, UserDocument } from 'src/models/users/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(dto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
