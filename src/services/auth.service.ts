const API_URL = "http://127.0.0.1:8000/api/auth";

interface LoginResponse {
    token: string;
    [key: string]: any;
}

interface UserData {
    username: string;
    password: string;
    [key: string]: any;
}

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    if (!username.trim() || !password.trim()) {
        throw new Error("Usuario y contraseña son requeridos");
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: getAuthHeaders(),
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data: LoginResponse = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        if (!data.token) {
            throw new Error("No se recibió token de autenticación");
        }

        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};

export const register = async (userData: UserData): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en el registro");
        }

        return data;
    } catch (error) {
        console.error("Error en registro:", error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: getAuthHeaders(),
        });

        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error en logout:", error);
        throw error;
    }
};

export const checkAuth = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/check`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        return response.ok;
    } catch (error) {
        return false;
    }
};