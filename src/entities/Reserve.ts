import { IReservation } from './interfaces/reservation.interface.js'
import type { IRoom } from './interfaces/room.interface.js';
import { IUser } from './interfaces/user.interface.js';
import { Strategy , ReservaNormal } from './strategy.js';

export class ControlOfReservation {
    politicaDeReserva: Strategy = new ReservaNormal(); //strategia Defaut
    users: IUser[] = [];
    rooms: IRoom[] = [];
    reservations: IReservation[] = [];
    
    //chamada para resevar
    reserve (idUser: number, idRoom: number, startTime: Date, endTime: Date) {
        try {
            const user = this.users.find(user => user.id === idUser);
            const room = this.rooms.find(room => room.id === idRoom);
            if (!user || !room) {
                throw new Error('User or room not found');
            }
            //arrumar um jeito de retonar um IReservation
            this.politicaDeReserva.execute()

        } catch (error) {}
    }

    cancelReservation (idReservation: number) {
        const reservation = this.reservations.find(reservation => reservation.id === idReservation);
        if (!reservation) {
            throw new Error('Reservation not found');
        } else {
            //reservation.room.reserved = false;
        }
    }

    setStrategy(newStrategy: Strategy){
        this.politicaDeReserva = newStrategy
    }


}

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
        this.room.reserved = true;
    }
    
    public print () {
        console.log("teste")
        if (this.user && this.room)
            console.log(`Reservation ${this.id}: ${this.user.name} - ${this.room.type}`);
        else
            console.log(`Reservation ${this.id}: No user or room found`);
    }

}