import { Product } from './product.model';

export interface ListProduct {
    id: number;
    amount: number;
    productId: number; // Relación con Product
    shoppingListId: number; // Relación con ShoppingList
    product?: Product; // Opcional para joins
}