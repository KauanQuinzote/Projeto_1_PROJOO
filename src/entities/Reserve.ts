import { IReservation } from './interfaces/reservation.interface.js'
import type { IRoom } from './interfaces/room.interface.js';
import { IUser } from './interfaces/user.interface.js';
import { Strategy , ReservaNormal } from './strategy.js';

export class ControlOfReservation {
    politicaDeReserva: Strategy = new ReservaNormal(); //strategia Defaut
    users: IUser[] = [];
    rooms: IRoom[] = [];
    reservations: Reservation[] = [];
    
    //chamada para resevar
    reserve (idUser: number, idRoom: number, startTime: Date, endTime: Date) {
        try {
            const user = this.users.find(user => user.id === idUser);
            const room = this.rooms.find(room => room.id === idRoom);
            if (!user || !room) {
                throw new Error('User or room not found');
            }
            console.log(`Tentando reservar a sala ${room.id} para o usuário ${user.name} no período de ${startTime} a ${endTime}`);
            const reserva = this.politicaDeReserva.execute(user, room, startTime, endTime, this.reservations);
            if (reserva) {
                this.reservations.push(reserva);
            }

        } catch (error) {}
    }

    cancelReservation (idReservation: number) {
        const reservation = this.reservations.find(reservation => reservation.id === idReservation);
        if (!reservation) {
            throw new Error('Reservation not found');
        } else {
            if (reservation.room)
                reservation.room.reserved = false;
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
        userId: number,
        roomId: number,
        startTime: Date,
        endTime: Date,
        user: IUser | undefined,
        room: IRoom | undefined
    ) {
        //id gerado pelo sistema usando config do singleton
        this.id = Math.floor(Math.random() * 1000000);
        //por enquato gerado aleatoriamente, mas pode ser implementado um sistema de ID mais robusto

        this.userId = userId;
        this.roomId = roomId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.user = user;
        this.room = room;
        if (this.room)
            this.room.reserved = true;
    }
    
    public print () {
        if (this.user && this.room)
            console.log(`Reservation ${this.id}: ${this.user.name} - ${this.room.type}`);
        else
            console.log(`Reservation ${this.id}: No user or room found`);
    }

}

export function ConflitoAgenda (dataInit1: Date, dataFim2: Date, dataInit2: Date, dataFim1: Date): boolean {
    if (dataInit1 < dataFim2 && dataInit2 < dataFim1)//funçao qu compara conflito entre datas
        return true; //verdadeiro para que nao tem conflito
    else
        return false; // false para caso haja conflito
}