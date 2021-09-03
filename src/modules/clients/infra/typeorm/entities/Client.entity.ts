import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order.entity';
import { PersonType } from '@modules/clients/types/PersonTypeEnum';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  company_name: string;

  @Column()
  cpf?: string;

  @Column()
  cnpj?: string;

  @Column({ nullable: false, enum: PersonType })
  person_type: PersonType;

  @Column()
  financial_contact_name?: string;

  @Column()
  technician_contact_name?: string;

  @Column()
  financial_contact_email?: string;

  @Column()
  technician_contact_email?: string;

  @Column()
  invoice_email: string;

  @OneToMany(() => Order, (order) => order.client, {
    eager: true,
    nullable: true,
  })
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
