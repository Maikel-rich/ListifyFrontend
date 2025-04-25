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
    supermarket?: Supermarket | null;
    category?: Category | null;
    amount?: number; // <-- Añadir esta propiedad si no la tienes
}