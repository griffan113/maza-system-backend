
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
    cnpj?: Nullable<string>;
    cpf?: Nullable<string>;
    person_type: string;
    company_name: string;
    financial_contact_email?: Nullable<string>;
    financial_contact_name?: Nullable<string>;
    technician_contact_email?: Nullable<string>;
    technician_contact_name?: Nullable<string>;
    invoice_email?: Nullable<string>;
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
    id: string;
    cnpj?: Nullable<string>;
    company_name: string;
    cpf?: Nullable<string>;
    financial_contact_email?: Nullable<string>;
    financial_contact_name?: Nullable<string>;
    invoice_email?: Nullable<string>;
    technician_contact_email?: Nullable<string>;
    technician_contact_name?: Nullable<string>;
    created_at: Date;
    updated_at: Date;
}

export class User {
    id: string;
    email: EmailAddress;
    role: UserRole;
    name: string;
    password: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export type DateTime = any;
export type EmailAddress = any;
type Nullable<T> = T | null;
