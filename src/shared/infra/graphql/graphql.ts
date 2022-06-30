
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
    name?: Nullable<string>;
    corporate_name?: Nullable<string>;
    fantasy_name?: Nullable<string>;
    phone?: Nullable<string>;
    cnpj?: Nullable<string>;
    state_registration?: Nullable<string>;
    nfe_email?: Nullable<string>;
    cep: string;
    address_number?: Nullable<string>;
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

export abstract class IMutation {
    abstract createClient(createClientDTO: CreateClientDTO): Nullable<Client> | Promise<Nullable<Client>>;

    abstract deleteClient(id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract createUser(createUserDTO: CreateUserDTO): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserDTO: UpdateUserDTO): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract indexClients(): Nullable<Nullable<Client>[]> | Promise<Nullable<Nullable<Client>[]>>;

    abstract showClient(client_id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract indexUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract showUser(user_id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Client {
    id: UUID;
    name?: Nullable<string>;
    corporate_name?: Nullable<string>;
    fantasy_name?: Nullable<string>;
    phone?: Nullable<string>;
    cnpj?: Nullable<string>;
    state_registration?: Nullable<string>;
    nfe_email?: Nullable<string>;
    cep: string;
    address_number?: Nullable<string>;
    address?: Nullable<string>;
    created_at: DateTime;
    updated_at: DateTime;
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

export type DateTime = any;
export type UUID = any;
export type EmailAddress = any;
type Nullable<T> = T | null;
