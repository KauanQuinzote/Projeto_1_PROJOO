import type { IRoom } from './interfaces/room.interface.js';
import { IObserver } from './interfaces/observer.interface.js';
export declare class Lab implements IRoom {
    id: number;
    type: 'Lab';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers;
    constructor(id: number, reserved: boolean);
    setReserved(reserved: boolean): void;
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}
export declare class Individual implements IRoom {
    id: number;
    type: 'Individual';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers;
    constructor(id: number, reserved: boolean);
    setReserved(reserved: boolean): void;
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}
export declare class Group implements IRoom {
    id: number;
    type: 'Group';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers;
    constructor(id: number, reserved: boolean);
    setReserved(reserved: boolean): void;
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}
//# sourceMappingURL=Rooms.d.ts.map