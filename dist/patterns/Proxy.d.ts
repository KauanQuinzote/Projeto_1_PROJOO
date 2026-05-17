import type { IUser } from './interfaces/user.interface.js';
import { ControlOfReservation, type Reservation } from './Reserve.js';
export declare class ReservationAccessProxy {
    private readonly control;
    private currentUser;
    private loginAttempts;
    private readonly MAX_LOGIN_ATTEMPTS;
    constructor(control: ControlOfReservation);
    getLoggedUser(): IUser | undefined;
    login(email: string, password: string): IUser | undefined;
    attemptsLeft(email: string): number;
    logout(): void;
    listReservations(): Reservation[];
}
//# sourceMappingURL=Proxy.d.ts.map