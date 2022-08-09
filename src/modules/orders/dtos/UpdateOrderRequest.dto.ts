import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsIn,
  IsDate,
} from 'class-validator';
import { OrderPaymentMethod, OrderStatus } from '@prisma/client';

import CreateOrderItemDTO from '@modules/orders/dtos/CreateOrderItem.dto';
import CreateOrderEntryDTO from '@modules/orders/dtos/CreateOrderEntry.dto';

class UpdateOrderRequestDTO {
  @IsUUID()
  order_id: string;

  order_number: string;

  total_price: number;

  total_quantity: number;

  statuses: OrderStatus[];

  @IsOptional()
  @IsUUID()
  client_id: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsIn([...Object.values(OrderPaymentMethod)])
  payment_method?: OrderPaymentMethod;

  @IsOptional()
  @IsDate()
  payment_date?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  items?: CreateOrderItemDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  order_entries?: CreateOrderEntryDTO[];
}

export default UpdateOrderRequestDTO;
