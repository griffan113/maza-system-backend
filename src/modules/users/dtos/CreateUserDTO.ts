import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid e-mail' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsIn([...Object.values(UserRole)])
  role?: UserRole;
}

export default CreateUserDTO;
