import {
  IsBoolean,
  IsEmail,
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
  @IsBoolean()
  is_admin?: boolean;
}

export default CreateUserDTO;
