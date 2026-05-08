// Temporary local IRoom definition to avoid unresolved import path
// (keeps contract minimal; adjust fields to match project-wide definition if needed)
export interface IRoom {
    id: number;
    name?: string;
    capacity?: number;
}
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