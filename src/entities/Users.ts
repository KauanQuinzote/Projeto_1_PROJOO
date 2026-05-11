
import type { UserRole, IUser } from "./interfaces/user.interface.js";
import { IObserver } from "./interfaces/observer.interface.js";

export class Professor implements IUser, IObserver {
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

    update(roomId: number, roomType: string, reserved: boolean): void {
        const status = reserved ? 'RESERVADA' : 'DISPONÍVEL';
        console.log(`[Professor ${this.name}] Notificação: Sala ${roomId} (${roomType}) está ${status}`);
    }
}

export class Student implements IUser, IObserver {
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

    update(roomId: number, roomType: string, reserved: boolean): void {
        const status = reserved ? 'RESERVADA' : 'DISPONÍVEL';
        console.log(`[Aluno ${this.name}] Notificação: Sala ${roomId} (${roomType}) está ${status}`);
    }
}