import type { IReservation } from "./interfaces/reservation.interface.js";
import type { IUser } from "./interfaces/user.interface.js";
import type { IRoom } from "./interfaces/room.interface.js";

class Reservation implements IReservation {
    id: number;
    user:   IUser;
    room: IRoom;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, user: IUser, room: IRoom, startTime: Date, endTime: Date) {
        this.id = id;
        this.user = user;
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export { Reservation };