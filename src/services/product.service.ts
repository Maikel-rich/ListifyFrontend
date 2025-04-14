import { Product } from "@/models/product.model";
import { Category } from "@/models/category.model";
import { Supermarket } from "@/models/supermarket.model";

const API_URL = "http://localhost:8000/api/product";

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No encontrado el token");
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const ProductService = {
    // Crear nuevo producto
    async createProduct(productData: {
        name: string;
        description?: string;
        price?: number;
        category: number;
        supermarket: number;
    }): Promise<Product> {
        try {
            const response = await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category: productData.category,
                    supermarket: productData.supermarket,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al crear producto");
            }

            return await response.json();
        } catch (error) {
            console.error("Error creando el producto:", error);
            throw error;
        }
    },

    // Editar un producto existente
    async updateProduct(
        id: number,
        productData: {
            name?: string;
            description?: string;
            price?: number;
            category?: number;
            supermarket?: number;
        }
    ): Promise<Product> {
        try {
            const response = await fetch(`${API_URL}/edit/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category: productData.category,
                    supermarket: productData.supermarket,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error actualizando producto");
            }

            return await response.json();
        } catch (error) {
            console.error("Error actualizando producto:", error);
            throw error;
        }
    },

    // Borrar un producto
    async deleteProduct(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error borrando producto");
            }
        } catch (error) {
            console.error("Error borrando producto:", error);
            throw error;
        }
    },

    // Obtener todos los productos del usuario
    async getUserProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error obteniendo productos");
            }

            return await response.json();
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            throw error;
        }
    },

    // Helper function to enrich products with category and supermarket data
    enrichProduct(
        product: Product,
        categories: Category[],
        supermarkets: Supermarket[]
    ): Product {
        return {
            ...product,
            category: categories.find((c) => c.id === product.categoryId),
            supermarket: supermarkets.find((s) => s.id === product.supermarketId),
        };
    },
};