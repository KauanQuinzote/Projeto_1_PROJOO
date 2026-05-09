import type { IRoom } from './interfaces/room.interface.js';

export class Lab implements IRoom {
    id: number;
    type: 'Lab' = 'Lab';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class Individual implements IRoom {
    id: number;
    type: 'Individual' = 'Individual';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class Group implements IRoom {
    id: number;
    type: 'Group' = 'Group';
    reserved: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, reserved: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}