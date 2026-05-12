import { Group, Individual, Lab } from "./Rooms.js";
export class RoomFactory {
    constructor() { }
    static createRoom(type, reserved = false) {
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
//# sourceMappingURL=Factory.js.map