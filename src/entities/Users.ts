

import type { UserRole, IUser } from "./interfaces/user.interface.js";

export class Professor implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole = 'Professor';
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class Student implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole = 'Student';
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}