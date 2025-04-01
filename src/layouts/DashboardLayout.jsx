import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardBar from "../components/DashboardBar";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header.jsx";
import { User } from 'lucide-react';
import { logout } from "../services/auth.service.ts";

const DashboardLayout = () => {
    const navigate = useNavigate();

    // 🔐 Comprobar si el usuario está autenticado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // 🔄 Redirigir al login si no está autenticado
        }
    }, [navigate]);

    // 🔐 Manejar el logout correctamente
    const handleLogout = async () => {
        await logout(); // Llamar a la función de logout
        navigate("/login"); // Redirigir al login después de cerrar sesión
    };

    return (
        <div className="md:w-[80%] w-[90%] mt-8 mx-auto">
            <header>
                <div className='flex items-center justify-between text-[var(--white)] mb-6 px-4'>
                    <Header />
                    <User size={36} onClick={handleLogout} className="cursor-pointer hover:text-gray-400"/>
                </div>
                <SearchBar />
            </header>
            <main className="pt-8">
                <Outlet />
            </main>
            <DashboardBar/>
        </div>
    );
};

export default DashboardLayout;
