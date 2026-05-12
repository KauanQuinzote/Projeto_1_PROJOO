import type { IRoom } from './interfaces/room.interface.js';

abstract class RoomDecorator {
  protected room: IRoom;

  constructor(room: IRoom) {
    this.room = room;
  }
}

export class ProjectorRoom extends RoomDecorator {
  projector: boolean = true;
}

export class CleaningServiceRoom extends RoomDecorator {
  cleaning: boolean = true;
}

export class CoffeeAreaRoom extends RoomDecorator {
  coffee: boolean = true;
}

