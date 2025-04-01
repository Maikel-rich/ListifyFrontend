import {Client} from "./client.model";

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    client?: Client;
}

export interface UserRegisterData {
    username: string;
    email: string;
    password: string;
    client: Omit<Client, 'id'>; // Todos los campos de Client excepto id
}