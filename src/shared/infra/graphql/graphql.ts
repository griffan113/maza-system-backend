
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type OrderPaymentMethod = "CARD" | "CASH" | "PIX" | "BANK_BILL";
export type OrderItemType = "SHARPE" | "SELL" | "ESTIMATE";
export type SharpeType = "COMPLETE" | "PARTIAL" | "WITH_REPAIR";
export type OrderStatusEnum = "RECEPT" | "IN_PROGRESS" | "WAITING_WITHDRAW" | "WAITING_PAYMENT" | "DONE" | "CANCELED";
export type UserRole = "ADMIN" | "PRODUCTION" | "EDITOR";

export class CreateClientDTO {
    company_name?: Nullable<string>;
    fantasy_name?: Nullable<string>;
    phone?: Nullable<string>;
    cnpj?: Nullable<string>;
    state_registration?: Nullable<string>;
    nfe_email?: Nullable<string>;
    cep: string;
    address_number?: Nullable<string>;
    contacts?: Nullable<Nullable<CreateClientContactDTO>[]>;
}

export class UpdateClientDTO {
    client_id: string;
    company_name?: Nullable<string>;
    fantasy_name?: Nullable<string>;
    phone?: Nullable<string>;
    cnpj?: Nullable<string>;
    state_registration?: Nullable<string>;
    nfe_email?: Nullable<string>;
    cep: string;
    address_number?: Nullable<string>;
    contacts?: Nullable<Nullable<CreateClientContactDTO>[]>;
}

export class CreateClientContactDTO {
    name?: Nullable<string>;
    sector?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
}

export class CreateProductDTO {
    name: string;
    teeth_number: number;
    diameter: number;
    price: number;
}

export class UpdateProductDTO {
    product_id?: Nullable<string>;
    teeth_number?: Nullable<number>;
    diameter?: Nullable<number>;
    price?: Nullable<number>;
}

export class CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role?: Nullable<UserRole>;
}

export class UpdateUserDTO {
    user_id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<UserRole>;
    password?: Nullable<string>;
    old_password?: Nullable<string>;
}

export class PaginationRequestDTO {
    page?: Nullable<number>;
    take?: Nullable<number>;
}

export abstract class IMutation {
    abstract createClient(createClientDTO: CreateClientDTO): Nullable<Client> | Promise<Nullable<Client>>;

    abstract deleteClient(id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract updateClient(updateClientDTO: UpdateClientDTO): Nullable<Client> | Promise<Nullable<Client>>;

    abstract createProduct(createProductDTO: CreateProductDTO): Nullable<Product> | Promise<Nullable<Product>>;

    abstract deleteProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract updateProduct(updateProductDTO: UpdateProductDTO): Nullable<Product> | Promise<Nullable<Product>>;

    abstract createUser(createUserDTO: CreateUserDTO): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserDTO: UpdateUserDTO): Nullable<User> | Promise<Nullable<User>>;
}

export class WithPaginationClientsResponse {
    metadata?: Nullable<PaginationMetadata>;
    data?: Nullable<Nullable<Client>[]>;
}

export abstract class IQuery {
    abstract indexClients(paginationRequestDTO?: Nullable<PaginationRequestDTO>, filter?: Nullable<string>): Nullable<WithPaginationClientsResponse> | Promise<Nullable<WithPaginationClientsResponse>>;

    abstract showClient(client_id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract indexProducts(paginationRequestDTO?: Nullable<PaginationRequestDTO>, filter?: Nullable<string>): Nullable<WithPaginationProductsResponse> | Promise<Nullable<WithPaginationProductsResponse>>;

    abstract showProduct(product_id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract indexUsers(paginationRequestDTO?: Nullable<PaginationRequestDTO>, filter?: Nullable<string>): Nullable<WithPaginationUsersResponse> | Promise<Nullable<WithPaginationUsersResponse>>;

    abstract showUser(user_id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Client {
    id: UUID;
    company_name?: Nullable<string>;
    fantasy_name?: Nullable<string>;
    phone?: Nullable<string>;
    cnpj?: Nullable<string>;
    state_registration?: Nullable<string>;
    nfe_email?: Nullable<string>;
    cep: string;
    address_number?: Nullable<string>;
    address?: Nullable<string>;
    contacts?: Nullable<Nullable<ClientContact>[]>;
    created_at: DateTime;
    updated_at: DateTime;
}

export class ClientContact {
    id: UUID;
    name?: Nullable<string>;
    sector?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    client_id: string;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export class Order {
    id: UUID;
    order_number: string;
    statuses?: Nullable<Nullable<OrderStatus>[]>;
    client_id: string;
    client?: Nullable<Client>;
    total_price: number;
    total_quantity: number;
    observations?: Nullable<string>;
    delivery_fee?: Nullable<number>;
    payment_method?: Nullable<OrderPaymentMethod>;
    payment_date?: Nullable<DateTime>;
    items?: Nullable<Nullable<OrderItem>[]>;
    order_entries?: Nullable<Nullable<OrderEntry>[]>;
    created_at: DateTime;
    updated_at: DateTime;
}

export class OrderEntry {
    id: UUID;
    order_id: string;
    order: Order;
    description: string;
    diameter?: Nullable<number>;
    quantity: number;
    price: number;
    created_at: DateTime;
    updated_at: DateTime;
}

export class OrderItem {
    id: UUID;
    total_price: number;
    type: OrderItemType;
    sharpe_type?: Nullable<SharpeType>;
    quantity: number;
    product_unity_price?: Nullable<number>;
    code: string;
    order: Order;
    pallet_quantity?: Nullable<number>;
    pallet_price?: Nullable<number>;
    insertion_quantity?: Nullable<number>;
    insertion_price?: Nullable<number>;
    order_id: string;
    product_id: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export class OrderStatus {
    id: UUID;
    date?: Nullable<DateTime>;
    status?: Nullable<OrderStatusEnum>;
    order?: Nullable<Nullable<Order>[]>;
    created_at: DateTime;
    updated_at: DateTime;
}

export class WithPaginationProductsResponse {
    metadata?: Nullable<PaginationMetadata>;
    data?: Nullable<Nullable<Product>[]>;
}

export class Product {
    id: UUID;
    name: string;
    teeth_number: number;
    diameter: number;
    price: number;
    created_at: DateTime;
    updated_at: DateTime;
}

export class WithPaginationUsersResponse {
    metadata?: Nullable<PaginationMetadata>;
    data?: Nullable<Nullable<User>[]>;
}

export class User {
    id: UUID;
    email: EmailAddress;
    role: UserRole;
    name: string;
    password: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export class PaginationMetadata {
    page: number;
    take: number;
    pageCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type DateTime = any;
export type UUID = any;
export type EmailAddress = any;
type Nullable<T> = T | null;
