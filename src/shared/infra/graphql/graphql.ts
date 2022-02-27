
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

export class UpdateUserDTO {
    user_id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    old_password?: Nullable<string>;
}

export abstract class IMutation {
    abstract createUser(createUserDTO: CreateUserDTO): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserDTO: UpdateUserDTO): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract indexUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract showUser(user_id: string): Nullable<User> | Promise<Nullable<User>>;
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
