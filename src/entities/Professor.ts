import type { UserRole } from "./interfaces/user.interface";
import type { IUser } from "./interfaces/user.interface";

class Professor implements IUser {
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
        this.password = password;;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export = Professor;