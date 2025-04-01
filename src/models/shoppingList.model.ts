import { ListProduct } from './listProduct.model';

export enum ShoppingListStatus {
    IN_PROCESS= 1,
    DONE = 2,
}

export interface ShoppingList {
    id: number;
    name: string;
    userId: number;
    status: ShoppingListStatus;
    updatedAt: Date;
    products?: ListProduct[];
}