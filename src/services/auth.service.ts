import { User } from "@/models/user.model";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface LoginResponse {
    token: string;
    user?: User;
}

interface RegisterPayload extends User {
    password: string;
}

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
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
        console.error('Validation failed - Empty fields');
        throw new Error("Username and password are required");
    }

    console.group('Login Request');
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: getAuthHeaders(),
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        console.log('Response status:', response.status);
        const data: LoginResponse = await response.json();
        console.log('Response data:', data);

        if (!data.token) {
            console.error('Missing token in response');
            throw new Error("Authentication token missing");
        }

        console.log('Login successful');
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error instanceof Error ? error : new Error("Login failed");
    } finally {
        console.groupEnd();
    }
};

export const register = async (userData: RegisterPayload): Promise<User> => {
    console.group('Register Request');
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            console.error('Error response:', data);
            throw new Error(data.message || "Registration failed");
        }

        return data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error instanceof Error ? error : new Error("Registration failed");
    } finally {
        console.groupEnd();
    }
};

export const logout = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;

    console.group('Logout Request');
    try {
        await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: getAuthHeaders(),
        });

        console.log('Logout successful');
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Logout error:", error);
        throw error instanceof Error ? error : new Error("Logout failed");
    } finally {
        console.groupEnd();
    }
};

export const checkAuth = async (): Promise<boolean> => {
    console.group('Auth Check');
    try {
        const response = await fetch(`${API_URL}/check`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        console.log('Auth check status:', response.status);
        return response.ok;
    } catch (error) {
        console.error("Auth check error:", error);
        return false;
    } finally {
        console.groupEnd();
    }
};