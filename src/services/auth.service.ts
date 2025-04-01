import { User } from "../models/user.model";
import { Client } from "../models/client.model";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface LoginResponse {
    token: string;
    user?: User;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    if (!username.trim() || !password.trim()) {
        console.error('Validación fallida - Campos vacíos');
        throw new Error("Username and password are required");
    }

    console.group('Debug: Login Request');
    console.log('Endpoint:', `${API_URL}/login`);
    console.log('Método: POST');
    console.log('Headers:', {
        "Content-Type": "application/json",
        "Accept": "application/json"
    });
    console.log('Payload:', { username, password });
    console.groupEnd();

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            console.error('Error en la respuesta:', data);
            throw new Error(data.message || "Login failed");
        }

        if (!data.token) {
            console.error('Token no recibido en la respuesta');
            throw new Error("Authentication token missing");
        }

        console.log('Login exitoso, token recibido');
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Error completo en login:", error);
        throw new Error(typeof error === 'string' ? error : "Login failed");
    }
};

export const register = async (userData: User & { password: string }): Promise<User> => {
    try {
        console.group('Debug: Register Request');
        console.log('Endpoint:', `${API_URL}/register`);
        console.log('Método: POST');
        console.log('Headers:', { "Content-Type": "application/json" });
        console.log('Payload:', userData);
        console.groupEnd();

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            console.error('Error en la respuesta:', data);
            throw new Error(data.message || "Error en el registro");
        }

        return data;
    } catch (error) {
        console.error("Error completo en registro:", error);
        throw new Error(typeof error === 'string' ? error : "Registro fallido");
    }
};

export const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        console.group('Debug: Logout Request');
        console.log('Endpoint:', `${API_URL}/logout`);
        console.log('Método: POST');
        console.log('Headers:', { "Authorization": `Bearer ${token}` });
        console.groupEnd();

        await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
        });

        console.log('Logout exitoso');
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error completo en logout:", error);
        throw new Error("Error al cerrar sesión");
    }
};
