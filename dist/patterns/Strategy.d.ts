import { IReservation } from "./interfaces/reservation.interface.js";
import { Reservation } from "./Reserve.js";
export interface Strategy {
    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]): Reservation | undefined;
}
export declare class ReservaPrioritaria implements Strategy {
    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]): Reservation;
}
export declare class ReservaNormal implements Strategy {
    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]): Reservation | undefined;
}
//# sourceMappingURL=Strategy.d.ts.map