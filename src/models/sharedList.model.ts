import { ShoppingList } from './shoppingList.model';
import { User } from './user.model';

export enum SharedListRole {
    READ = 0,
    WRITE = 1,
}

export interface SharedList {
    id: number;
    shoppingListId: number; // Relación con ShoppingList
    userId: number; // Relación con User
    role: SharedListRole;
    shoppingList?: ShoppingList; // Opcional para joins
    user?: User; // Opcional para joins
}