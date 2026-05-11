import { IRoom } from "./interfaces/room.interface.js";
import type { RoomType } from "./interfaces/room.interface.js";
import { Group, Individual, Lab } from "./Rooms.js";

export class RoomFactory {
    private constructor() {}
    
    static createRoom(type: RoomType, reserved = false): IRoom {
        const id = Math.floor(Math.random() * 10000);
        
        switch (type) {
            case 'Lab':
                return new Lab(id, reserved);

            case 'Individual':
                return new Individual(id, reserved);
                
            case 'Group':
                return new Group(id, reserved);

            default:
                throw new Error('Invalid room type');
        }
    }
}