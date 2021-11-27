import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateSessionDTO {
  @IsEmail({}, { message: 'Invalid e-mail' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default CreateSessionDTO;
