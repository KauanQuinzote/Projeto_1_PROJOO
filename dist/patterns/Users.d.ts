import type { UserRole, IUser } from "./interfaces/user.interface.js";
import { IObserver } from "./interfaces/observer.interface.js";
export declare class Professor implements IUser, IObserver {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    constructor(name: string, email: string, password: string);
    update(roomId: number, roomType: string, reserved: boolean): void;
}
export declare class Student implements IUser, IObserver {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    constructor(name: string, email: string, password: string);
    update(roomId: number, roomType: string, reserved: boolean): void;
}
//# sourceMappingURL=Users.d.ts.map