import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateOrderEntryDTO {
  order_id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsInt()
  diameter?: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}

export default CreateOrderEntryDTO;
