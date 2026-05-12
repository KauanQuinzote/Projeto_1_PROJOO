import type { IRoom } from './room.interface.js';
import type { IUser } from './user.interface.js';
export interface IReservation {
    id: number;
    user: IUser | undefined;
    room: IRoom | undefined;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=reservation.interface.d.ts.map