import type { IRoom } from './interfaces/room.interface.js';
import { ISubject, IObserver } from './interfaces/observer.interface.js';

export class Lab implements IRoom {
    id: number;
    type: 'Lab' = 'Lab';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers: IObserver[] = [];

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    setReserved(reserved: boolean): void {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }

    subscribe(observer: IObserver): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(): void {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}

export class Individual implements IRoom {
    id: number;
    type: 'Individual' = 'Individual';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers: IObserver[] = [];

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    setReserved(reserved: boolean): void {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }

    subscribe(observer: IObserver): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(): void {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}

export class Group implements IRoom {
    id: number;
    type: 'Group' = 'Group';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;
    private observers: IObserver[] = [];

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    setReserved(reserved: boolean): void {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }

    subscribe(observer: IObserver): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(): void {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}