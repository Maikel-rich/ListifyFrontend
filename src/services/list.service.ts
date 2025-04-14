import { ShoppingList } from "@/models/shoppingList.model";

const API_URL = "http://127.0.0.1:8000/api/list";

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

const handleResponse = async <T,>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    return response.json();
};

export const getListsByUser = async (): Promise<ShoppingList[]> => {
    try {
        const response = await fetch(`${API_URL}/getListsByUser`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        return await handleResponse<ShoppingList[]>(response);
    } catch (error) {
        console.error("Error fetching lists:", error);
        throw error;
    }
};

export const createList = async (name: string, description?: string): Promise<ShoppingList> => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ name, description }),
        });
        return await handleResponse<ShoppingList>(response);
    } catch (error) {
        console.error("Error creating list:", error);
        throw error;
    }
};

export const editList = async (id: number, updates: Partial<ShoppingList>): Promise<ShoppingList> => {
    try {
        const response = await fetch(`${API_URL}/edit/${id}`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        return await handleResponse<ShoppingList>(response);
    } catch (error) {
        console.error("Error editing list:", error);
        throw error;
    }
};

export const updateListStatus = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/updateStatus/${id}`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        await handleResponse<void>(response);
    } catch (error) {
        console.error("Error updating list status:", error);
        throw error;
    }
};