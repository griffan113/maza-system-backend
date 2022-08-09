import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class UpdateProductDTO {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  teeth_number: number;

  @IsOptional()
  @IsInt()
  diameter: number;

  @IsOptional()
  @IsNumber()
  price: number;
}

export default UpdateProductDTO;
