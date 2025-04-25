import {Product} from "@/models/product.model";

export enum ShoppingListStatus {
    IN_PROCESS= 1,
    DONE = 2,
}

export interface ShoppingList {
    id: number;
    name: string;
    status: number;
    updatedAt: string;
    products: {
        productId: number;
        productName: string;
        description: string;
        price: number;
        isFavorite: boolean | null;
        amount: number;
    }[];
}
