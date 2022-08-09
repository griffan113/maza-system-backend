import { OrderStatusEnum } from '@prisma/client';
import { IsIn } from 'class-validator';

class CreateOrderStatusDTO {
  @IsIn([...Object.values(OrderStatusEnum)])
  status: OrderStatusEnum;
}

export default CreateOrderStatusDTO;
