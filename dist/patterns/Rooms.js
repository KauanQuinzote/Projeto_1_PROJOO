export class Lab {
    id;
    type = 'Lab';
    reserved;
    createdAt;
    updatedAt;
    observers = [];
    constructor(id, reserved) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    setReserved(reserved) {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify() {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}
export class Individual {
    id;
    type = 'Individual';
    reserved;
    createdAt;
    updatedAt;
    observers = [];
    constructor(id, reserved) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    setReserved(reserved) {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify() {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}
export class Group {
    id;
    type = 'Group';
    reserved;
    createdAt;
    updatedAt;
    observers = [];
    constructor(id, reserved) {
        this.id = id;
        this.reserved = reserved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    setReserved(reserved) {
        this.reserved = reserved;
        this.updatedAt = new Date();
        this.notify();
    }
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify() {
        this.observers.forEach(observer => observer.update(this.id, this.type, this.reserved));
    }
}
//# sourceMappingURL=Rooms.js.map