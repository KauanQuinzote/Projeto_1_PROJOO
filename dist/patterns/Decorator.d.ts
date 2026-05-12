import type { IRoom } from './interfaces/room.interface.js';
export type RoomAddon = 'Projector' | 'CleaningService' | 'CoffeeArea';
export interface IRoomWithAddons extends IRoom {
    getAddons(): RoomAddon[];
}
declare abstract class RoomDecorator implements IRoomWithAddons {
    protected room: IRoom;
    constructor(room: IRoom);
    get id(): number;
    set id(value: number);
    get type(): IRoom['type'];
    set type(value: IRoom['type']);
    get reserved(): boolean;
    set reserved(value: boolean);
    get createdAt(): Date;
    set createdAt(value: Date);
    get updatedAt(): Date;
    set updatedAt(value: Date);
    subscribe(observer: Parameters<IRoom['subscribe']>[0]): void;
    unsubscribe(observer: Parameters<IRoom['unsubscribe']>[0]): void;
    notify(): void;
    setReserved(reserved: boolean): void;
    getAddons(): RoomAddon[];
}
export declare class ProjectorRoom extends RoomDecorator {
    getAddons(): RoomAddon[];
}
export declare class CleaningServiceRoom extends RoomDecorator {
    getAddons(): RoomAddon[];
}
export declare class CoffeeAreaRoom extends RoomDecorator {
    getAddons(): RoomAddon[];
}
export {};
//# sourceMappingURL=Decorator.d.ts.map