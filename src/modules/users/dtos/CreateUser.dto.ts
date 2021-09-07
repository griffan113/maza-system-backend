import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid e-mail' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default CreateUserDTO;
