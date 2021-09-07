import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client.entity';
import OrderStatusEnum from '@modules/orders/types/OrderStatusEnum';
import SawOrder from './SawOrder.entity';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  order_number: number;

  @Column({ enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  total_price: number;

  @Column()
  total_quantity: number;

  @OneToMany(() => SawOrder, (saw_order) => saw_order.order, {
    eager: true,
    nullable: true,
  })
  saw_orders: SawOrder[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
