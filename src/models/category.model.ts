import { User } from './user.model';

export interface Category {
    id: number;
    name: string;
    userId: number;
    user?: User;
}