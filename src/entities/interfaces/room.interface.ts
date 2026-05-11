export type RoomType = 'Lab' | 'Individual' | 'Group';

export interface IRoom {
  id: number;
  type: RoomType;
  reserved: boolean;
  createdAt: Date;
  updatedAt: Date;
}