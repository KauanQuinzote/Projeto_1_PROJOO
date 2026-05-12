class RoomDecorator {
    room;
    constructor(room) {
        this.room = room;
    }
    get id() {
        return this.room.id;
    }
    set id(value) {
        this.room.id = value;
    }
    get type() {
        return this.room.type;
    }
    set type(value) {
        this.room.type = value;
    }
    get reserved() {
        return this.room.reserved;
    }
    set reserved(value) {
        this.room.reserved = value;
    }
    get createdAt() {
        return this.room.createdAt;
    }
    set createdAt(value) {
        this.room.createdAt = value;
    }
    get updatedAt() {
        return this.room.updatedAt;
    }
    set updatedAt(value) {
        this.room.updatedAt = value;
    }
    subscribe(observer) {
        this.room.subscribe(observer);
    }
    unsubscribe(observer) {
        this.room.unsubscribe(observer);
    }
    notify() {
        this.room.notify();
    }
    setReserved(reserved) {
        this.room.setReserved(reserved);
    }
    getAddons() {
        const inner = this.room;
        return typeof inner.getAddons === 'function' ? inner.getAddons() : [];
    }
}
export class ProjectorRoom extends RoomDecorator {
    getAddons() {
        return [...super.getAddons(), 'Projector'];
    }
}
export class CleaningServiceRoom extends RoomDecorator {
    getAddons() {
        return [...super.getAddons(), 'CleaningService'];
    }
}
export class CoffeeAreaRoom extends RoomDecorator {
    getAddons() {
        return [...super.getAddons(), 'CoffeeArea'];
    }
}
//# sourceMappingURL=Decorator.js.map