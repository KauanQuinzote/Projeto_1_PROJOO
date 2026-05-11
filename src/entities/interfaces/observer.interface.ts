// Interface para o Observer (usuários observando mudanças nas salas)
export interface IObserver {
    update(roomId: number, roomType: string, reserved: boolean): void;
}

export interface ISubject {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}

