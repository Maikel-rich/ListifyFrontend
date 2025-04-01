import { Category } from './category.model';
import { Supermarket } from './supermarket.model';

export interface Product {
    id: number;
    name: string;
    description?: string;
    price?: number;
    categoryId?: number; // Relación opcional
    supermarketId?: number; // Relación opcional
    userId: number; // Relación obligatoria
    isFavorite?: boolean;
    category?: Category; // Opcional para joins
    supermarket?: Supermarket; // Opcional para joins
}