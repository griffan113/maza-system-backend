import {
  IsOptional,
  IsIn,
  ValidateIf,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { OrderItemType, SharpeType } from '@prisma/client';

class CreateOrderItemDTO {
  total_price: number;

  order_id: string;

  @IsIn([...Object.values(OrderItemType)])
  type: OrderItemType;

  @ValidateIf((cls: CreateOrderItemDTO) => cls.type === 'SHARPE')
  @IsIn([...Object.values(SharpeType)])
  sharpe_type?: SharpeType;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsNumber()
  product_unity_price?: number;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsInt()
  pallet_quantity?: number;

  @IsOptional()
  @IsNumber()
  pallet_price?: number;

  @IsOptional()
  @IsInt()
  insertion_quantity?: number;

  @IsOptional()
  @IsNumber()
  insertion_price?: number;

  @IsUUID()
  product_id: string;
}

export default CreateOrderItemDTO;
