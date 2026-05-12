import { IObserver } from './observer.interface.js';
export type RoomType = 'Lab' | 'Individual' | 'Group';

export interface IRoom {
  id: number;
  type: RoomType;
  reserved: boolean;
  createdAt: Date;
  updatedAt: Date;
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
  setReserved(reserved: boolean): void;
}