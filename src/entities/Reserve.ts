import { IReservation } from './interfaces/reservation.interface.js'
import type { IRoom } from './interfaces/room.interface.js';
import { IUser } from './interfaces/user.interface.js';
import { Strategy , ReservaPrioritaria } from './strategy.js';

export class Reservation implements IReservation {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    user: IUser | undefined;
    room: IRoom | undefined;
    politicaDeReserva: Strategy = new ReservaPrioritaria(); //strategia Defaut


    constructor(
        id: number,
        userId: number,
        roomId: number,
        startTime: Date,
        endTime: Date,
        users: IUser[],
        rooms: IRoom[]
    ) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.user = users.find(user => user.id === this.userId)
        this.room = rooms.find(room => room.id === roomId) as IRoom;
    }
    
    setStrategy(newStrategy: Strategy){
        this.politicaDeReserva = newStrategy
    }

    print () {
        if (this.user && this.room)
            console.log(`Reservation ${this.id}: ${this.user.name} - ${this.room.type}`);
        else
            console.log(`Reservation ${this.id}: No user or room found`);
    }

}