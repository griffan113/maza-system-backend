
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRole {
    ADMIN = "ADMIN",
    PRODUCTION = "PRODUCTION",
    EDITOR = "EDITOR"
}

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

    abstract createUser(createUserDTO: CreateUserDTO): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserDTO: UpdateUserDTO): Nullable<User> | Promise<Nullable<User>>;
}

export class WithPaginationResponse {
    metadata?: Nullable<PaginationMetadata>;
    data?: Nullable<Nullable<Client>[]>;
}

export abstract class IQuery {
    abstract indexClients(paginationRequestDTO?: Nullable<PaginationRequestDTO>): Nullable<WithPaginationResponse> | Promise<Nullable<WithPaginationResponse>>;

    abstract showClient(client_id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract indexUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

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
