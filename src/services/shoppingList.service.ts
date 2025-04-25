import { ShoppingList } from "@/models/shoppingList.model";
const API_URL = "http://localhost:8000/api/list";
const REQUEST_TIMEOUT = 8000;

const ERROR_MESSAGES = {
    DEFAULT: "Error al obtener las listas",
    UNAUTHORIZED: "No autorizado",
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
        signal: controller.signal,
    });

    clearTimeout(id);
    return response;
};

export const ShoppingListService = {
    async getListsByUser(): Promise<ShoppingList[]> {
        try {
            const response = await fetchWithTimeout(`${API_URL}/getListsByUser`, {
                method: "GET",
                headers: getAuthHeaders(),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            const data = await response.json();
            return data.map((list: any) => ({
                ...list,
                products: list.products || [], // fallback si no hay productos
            }));
        } catch (error) {
            console.error("Error en getListsByUser:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },

    async getListById(id: string): Promise<ShoppingList> {
        try {
            const response = await fetchWithTimeout(`${API_URL}/${id}`, {
                method: "GET",
                headers: getAuthHeaders(),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || ERROR_MESSAGES.DEFAULT);
            }

            const data = await response.json();
            return {
                ...data,
                products: data.products || [], // fallback si no hay productos
            };
        } catch (error) {
            console.error("Error en getListById:", error);
            if (error instanceof Error) {
                throw new Error(error.message || ERROR_MESSAGES.DEFAULT);
            }
            throw new Error(ERROR_MESSAGES.DEFAULT);
        }
    },
};

