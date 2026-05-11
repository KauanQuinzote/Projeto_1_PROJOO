import type { UserRole, IUser } from "./interfaces/user.interface.js";
import { Gerenciamento } from "./singleton.js";

export class Professor implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole = 'Professor';
    createdAt: Date;
    updatedAt: Date;

    constructor(name: string, email: string, password: string) {
        this.id = this.id = Gerenciamento.getInstance().NUser++;
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

    constructor( name: string, email: string, password: string) {
        this.id = this.id = Gerenciamento.getInstance().NUser++;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}