
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract createUser(createUserDTO: CreateUserDTO): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract indexUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export class User {
    id: string;
    email: string;
    name: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

type Nullable<T> = T | null;
