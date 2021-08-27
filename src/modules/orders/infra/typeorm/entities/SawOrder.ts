import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Order from './Order';

@Entity('saw_orders')
class SawOrder {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  saw_code: string;

  @Column()
  quantity: number;

  @Column()
  teeth_number: number;

  @Column()
  teeth_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SawOrder;
