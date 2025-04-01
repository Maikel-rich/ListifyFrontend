export interface Client {
    name: string;
    surname: string;
    birthdate: string; // Formato YYYY-MM-DD
    dni: string;
    address?: string;
    phoneNumber?: string;
}