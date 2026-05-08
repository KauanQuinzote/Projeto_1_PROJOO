export type UserRole = 'Professor' | 'Student';

export interface IUser {
  id: number;
  name: string;
  role: UserRole;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}