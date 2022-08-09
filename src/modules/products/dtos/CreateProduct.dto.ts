import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  teeth_number: number;

  @IsInt()
  diameter: number;

  @IsNumber()
  price: number;
}

export default CreateProductDTO;
