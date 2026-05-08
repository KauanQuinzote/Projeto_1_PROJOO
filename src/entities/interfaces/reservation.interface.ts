import type { IRoom } from './room.interface';
import type { IUser } from './user.interface';

export interface IReservation {
    id: number;
    user: IUser;
    room: IRoom;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
}