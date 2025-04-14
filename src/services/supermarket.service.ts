import { Supermarket } from "@/models/supermarket.model";

const API_URL = "http://localhost:8000/api/supermarket";
const REQUEST_TIMEOUT = 8000;

const ERROR_MESSAGES = {
    DEFAULT: "Error en la operación con supermercados",
    NOT_FOUND: "Supermercado no encontrado",
    UNAUTHORIZED: "No autorizado",
    INVALID_DATA: "Datos de supermercado inválidos"
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

export const SupermarketService = {
    async createSupermarket(supermarketData: { name: string }): Promise<Supermarket> {
        try {
            if (!supermarketData.name || supermarketData.name.trim().length < 2) {
                throw new Error(ERROR_MESSAGES.INVALID_DATA);
            }

            const response = await fetchWithTimeout(`${API_URL}/create`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: supermarketData.name.trim()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en createSupermarket:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async updateSupermarket(id: number, supermarketData: { name: string }): Promise<Supermarket> {
        try {
            if (!supermarketData.name || supermarketData.name.trim().length < 2) {
                throw new Error(ERROR_MESSAGES.INVALID_DATA);
            }

            const response = await fetchWithTimeout(`${API_URL}/edit/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: supermarketData.name.trim()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en updateSupermarket:", error);
            if (error instanceof Error) {
                throw new Error(error.message.includes("NotFound")
                    ? ERROR_MESSAGES.NOT_FOUND
                    : error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async deleteSupermarket(id: number): Promise<void> {
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
            console.error("Error en deleteSupermarket:", error);
            if (error instanceof Error) {
                throw new Error(error.message.includes("NotFound")
                    ? ERROR_MESSAGES.NOT_FOUND
                    : error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async getUserSupermarkets(): Promise<Supermarket[]> {
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
            console.error("Error en getUserSupermarkets:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    }
};