import { IReservation } from './interfaces/reservation.interface.js';
import { IRoom } from './interfaces/room.interface.js';
import { IUser } from './interfaces/user.interface.js';
import type { IObserver } from './interfaces/observer.interface.js';
import { Strategy } from './Strategy.js';
export declare class ControlOfReservation {
    politicaDeReserva: Strategy;
    users: (IUser & IObserver)[];
    rooms: IRoom[];
    reservations: Reservation[];
    reserve(idUser: number, idRoom: number, startTime: Date, endTime: Date): Reservation | undefined;
    cancelReservation(idReservation: number): void;
    setStrategy(newStrategy: Strategy): void;
}
export declare class Reservation implements IReservation {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    user: IUser | undefined;
    room: IRoom | undefined;
    constructor(userId: number, roomId: number, startTime: Date, endTime: Date, user: IUser | undefined, room: IRoom | undefined);
    print(): void;
}
export declare function ConflitoAgenda(dataInit1: Date, dataFim2: Date, dataInit2: Date, dataFim1: Date): boolean;
//# sourceMappingURL=Reserve.d.ts.map