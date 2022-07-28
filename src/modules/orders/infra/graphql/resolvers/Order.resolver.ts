import {
  DefaultValuePipe,
  Inject,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateOrderService from '@modules/orders/services/CreateOrder.service';
import IndexOrdersService from '@modules/orders/services/IndexOrders.service';
import ShowOrderService from '@modules/orders/services/ShowOrder.service';
import DeleteOrderService from '@modules/orders/services/DeleteOrder.service';
import UpdateOrderService from '@modules/orders/services/UpdateOrder.service';
import { PaginateService } from '@shared/services/Paginate.service';
import { Order } from '@shared/infra/graphql/graphql';
import { WithPaginationResponse } from '@shared/types/WithPaginationResponse';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrder.dto';
import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';
import UpdateOrderRequestDTO from '@modules/orders/dtos/UpdateOrderRequest.dto';

@Resolver('Order')
export default class OrderResolver {
  constructor(
    @Inject('CreateOrderService')
    private readonly createOrderService: CreateOrderService,

    @Inject('UpdateOrderService')
    private readonly updateOrderService: UpdateOrderService,

    @Inject('IndexOrdersService')
    private readonly indexOrdersService: IndexOrdersService,

    @Inject('ShowOrderService')
    private readonly showOrderService: ShowOrderService,

    @Inject('DeleteOrderService')
    private readonly deleteOrderService: DeleteOrderService,

    @Inject('PaginateService')
    private readonly paginateService: PaginateService
  ) {}

  @Query(() => [Order], { name: 'indexOrders' })
  public async index(
    @Args(
      'paginationRequestDTO',
      ValidationPipe,
      new DefaultValuePipe<PaginationRequestDTO>({ page: 1, take: 5 })
    )
    pagination: PaginationRequestDTO,

    @Args('filter', new DefaultValuePipe(''))
    filter: string
  ): Promise<WithPaginationResponse<Order[]>> {
    const indexOrders = await this.indexOrdersService.execute({
      filter,
      pagination: { page: pagination.page, take: pagination.take },
    });

    const paginate = this.paginateService.execute(
      indexOrders,
      pagination.page,
      pagination.take
    );

    return paginate;
  }

  @Query(() => Order, { name: 'showOrder' })
  public async show(
    @Args('order_id', ParseUUIDPipe)
    order_id: string
  ): Promise<Order> {
    const showOrder = await this.showOrderService.execute({ order_id });

    return showOrder;
  }

  @Mutation(() => Order, { name: 'deleteOrder' })
  public async delete(
    @Args('id', ParseUUIDPipe)
    id: string
  ) {
    const deleteOrder = await this.deleteOrderService.execute({
      id,
    });

    return deleteOrder;
  }

  @Mutation(() => Order, { name: 'createOrder' })
  public async create(
    @Args('createOrderDTO', ValidationPipe)
    createOrderRequestDTO: CreateOrderDTO
  ): Promise<Order> {
    const createOrder = await this.createOrderService.execute(
      createOrderRequestDTO
    );

    return createOrder;
  }

  @Mutation(() => Order, { name: 'updateOrder' })
  public async update(
    @Args('updateOrderDTO', ValidationPipe)
    updateOrderDTO: UpdateOrderRequestDTO
  ): Promise<Order> {
    const updateOrder = await this.updateOrderService.execute(updateOrderDTO);

    return updateOrder;
  }
}
