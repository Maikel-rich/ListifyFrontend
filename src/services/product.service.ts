// product.service.ts
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { Supermarket } from "../models/supermarket.model";

const API_URL = "http://localhost:8000/api/product";

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const ProductService = {
    // Create a new product
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
                throw new Error(errorData.message || "Failed to create product");
            }

            return await response.json();
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },

    // Update an existing product
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
                throw new Error(errorData.message || "Failed to update product");
            }

            return await response.json();
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    // Delete a product
    async deleteProduct(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    },

    // Get all products for the current user
    async getUserProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch user products");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching user products:", error);
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