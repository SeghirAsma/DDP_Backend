import { IsEnum, IsString} from 'class-validator';
import { Role } from 'src/models/users/role.enum';

export class UserDto {

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEnum(Role)
  role: Role;

 
}
