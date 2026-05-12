import type { IRoom } from './interfaces/room.interface.js';

export type RoomAddon = 'Projector' | 'CleaningService' | 'CoffeeArea';

export interface IRoomWithAddons extends IRoom {
  getAddons(): RoomAddon[];
}

abstract class RoomDecorator implements IRoomWithAddons {
  protected room: IRoom;

  constructor(room: IRoom) {
    this.room = room;
  }

  get id(): number {
    return this.room.id;
  }
  set id(value: number) {
    this.room.id = value;
  }

  get type(): IRoom['type'] {
    return this.room.type;
  }
  set type(value: IRoom['type']) {
    this.room.type = value;
  }

  get reserved(): boolean {
    return this.room.reserved;
  }
  set reserved(value: boolean) {
    this.room.reserved = value;
  }

  get createdAt(): Date {
    return this.room.createdAt;
  }
  set createdAt(value: Date) {
    this.room.createdAt = value;
  }

  get updatedAt(): Date {
    return this.room.updatedAt;
  }
  set updatedAt(value: Date) {
    this.room.updatedAt = value;
  }

  subscribe(observer: Parameters<IRoom['subscribe']>[0]): void {
    this.room.subscribe(observer);
  }

  unsubscribe(observer: Parameters<IRoom['unsubscribe']>[0]): void {
    this.room.unsubscribe(observer);
  }

  notify(): void {
    this.room.notify();
  }

  setReserved(reserved: boolean): void {
    this.room.setReserved(reserved);
  }

  getAddons(): RoomAddon[] {
    const inner = this.room as unknown as { getAddons?: () => RoomAddon[] };
    return typeof inner.getAddons === 'function' ? inner.getAddons() : [];
  }
}

export class ProjectorRoom extends RoomDecorator {
  getAddons(): RoomAddon[] {
    return [...super.getAddons(), 'Projector'];
  }
}

export class CleaningServiceRoom extends RoomDecorator {
  getAddons(): RoomAddon[] {
    return [...super.getAddons(), 'CleaningService'];
  }
}

export class CoffeeAreaRoom extends RoomDecorator {
  getAddons(): RoomAddon[] {
    return [...super.getAddons(), 'CoffeeArea'];
  }
}

