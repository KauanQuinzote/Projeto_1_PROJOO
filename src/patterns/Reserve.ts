import { IReservation } from './interfaces/reservation.interface.js'
import { IRoom } from './interfaces/room.interface.js';
import { IUser } from './interfaces/user.interface.js';
import type { IObserver } from './interfaces/observer.interface.js';
import { Gerenciamento } from './Singleton.js';
import { Strategy , ReservaNormal } from './Strategy.js';

export class ControlOfReservation {
    politicaDeReserva: Strategy = new ReservaNormal();
    users: (IUser & IObserver)[] = [];
    rooms: IRoom[] = [];
    reservations: Reservation[] = [];
    
    reserve (idUser: number, idRoom: number, startTime: Date, endTime: Date): Reservation | undefined {
        try {
            if (startTime >= endTime) {
                throw new Error('Start time must be before end time');
            }
            const user = this.users.find(user => user.id === idUser);
            const room = this.rooms.find(room => room.id === idRoom);
            if (!user || !room) {
                throw new Error('User or room not found');
            }
            const reserva = this.politicaDeReserva.execute(user, room, startTime, endTime, this.reservations);
            if (reserva) {
                this.reservations.push(reserva);
            }
            console.log(`Reserva ${reserva ? 'realizada com sucesso' : 'falhou'}`);

            return reserva;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

        return undefined;
    }

    cancelReservation (idReservation: number) {
        const reservation = this.reservations.find(reservation => reservation.id === idReservation);
        if (!reservation) {
            throw new Error('Reservation not found');
        } else {
            this.reservations.splice(this.reservations.indexOf(reservation), 1);
            console.log(`Reserva ${reservation.id} cancelada com sucesso`);
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
        this.id = Gerenciamento.getInstance().NReservation++;

        this.userId = userId;
        this.roomId = roomId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.user = user;
        this.room = room;
        if (this.room) {
            // Usar o setter para atualizar timestamps e notificar observers.
            this.room.setReserved(true);
        }
    }
    
    public print () {
        if (this.user && this.room)
            console.log(`Reservation ${this.id}: ${this.user.name} - ${this.room.type} | ${this.startTime} to ${this.endTime}`);
        else
            console.log(`Reservation ${this.id}: No user or room found`);
    }

}

export function ConflitoAgenda (dataInit1: Date, dataFim2: Date, dataInit2: Date, dataFim1: Date): boolean {
    console.log(`Comparando datas: ${dataInit1} - ${dataFim1} com ${dataInit2} - ${dataFim2}`);
    if (dataInit1 <= dataFim2 && dataInit2 <= dataFim1) {//funçao qu compara conflito entre datas
        console.log("A Sala já está reservada para o período solicitado.");
        return true; //verdadeiro para que tem conflito
    } else {
        console.log("A Sala não está reservada para o período solicitado.");
        return false; // false para caso nao haja conflito
    }
}