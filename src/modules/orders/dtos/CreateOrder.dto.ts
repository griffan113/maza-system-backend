import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsIn,
  IsDate,
} from 'class-validator';
import { OrderPaymentMethod, OrderStatusEnum } from '@prisma/client';
import { Type } from 'class-transformer';

import CreateOrderItemDTO from '@modules/orders/dtos/CreateOrderItem.dto';
import CreateOrderEntryDTO from '@modules/orders/dtos/CreateOrderEntry.dto';

class CreateOrderDTO {
  order_number: string;

  total_price: number;

  total_quantity: number;

  status: OrderStatusEnum;

  @IsUUID()
  client_id: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsIn([...Object.values(OrderPaymentMethod)])
  payment_method?: OrderPaymentMethod;

  @IsOptional()
  @Type(() => Date)
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

export default CreateOrderDTO;
