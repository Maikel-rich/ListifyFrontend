import { Category } from "@/models/category.model";

const API_URL = "http://localhost:8000/api/category";
const REQUEST_TIMEOUT = 8000;

const ERROR_MESSAGES = {
    DEFAULT: "Error en la operación con categorías",
    NOT_FOUND: "Categoría no encontrada",
    UNAUTHORIZED: "No autorizado",
    INVALID_DATA: "Datos de categoría inválidos"
};

const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = REQUEST_TIMEOUT) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });

    clearTimeout(id);
    return response;
};

export const CategoryService = {
    async createCategory(categoryData: { name: string }): Promise<Category> {
        try {
            if (!categoryData.name || categoryData.name.trim().length < 2) {
                throw new Error(ERROR_MESSAGES.INVALID_DATA);
            }

            const response = await fetchWithTimeout(`${API_URL}/create`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ name: categoryData.name.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en createCategory:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async updateCategory(id: number, categoryData: { name: string }): Promise<Category> {
        try {
            if (!categoryData.name || categoryData.name.trim().length < 2) {
                throw new Error(ERROR_MESSAGES.INVALID_DATA);
            }

            const response = await fetchWithTimeout(`${API_URL}/edit/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ name: categoryData.name.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en updateCategory:", error);
            if (error instanceof Error) {
                throw new Error(error.message.includes("NotFound")
                    ? ERROR_MESSAGES.NOT_FOUND
                    : error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async deleteCategory(id: number): Promise<void> {
        try {
            const response = await fetchWithTimeout(`${API_URL}/delete/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }
        } catch (error) {
            console.error("Error en deleteCategory:", error);
            if (error instanceof Error) {
                throw new Error(error.message.includes("NotFound")
                    ? ERROR_MESSAGES.NOT_FOUND
                    : error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async getUserCategory(): Promise<Category[]> {
        try {
            const response = await fetchWithTimeout(`${API_URL}/getByUser`, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en getUserCategory:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    }
};