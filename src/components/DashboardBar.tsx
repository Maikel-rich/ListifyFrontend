import * as React from "react";
import { useState } from "react";
import { Home, Package, PlusCircle, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardBar() {
    const navigate = useNavigate();
    const [active, setActive] = useState("home");

    const navItems = [
        { id: "home", label: "Inicio", icon: <Home size={35} /> },
        { id: "productos", label: "Productos", icon: <Package size={35} /> },
        { id: "crear", label: "Crear", icon: <PlusCircle size={35} /> },
        { id: "listas", label: "Mis listas", icon: <List size={35} /> },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[50%] flex bg-[var(--gray-light)] h-[70px]
     rounded-full p-2 z-10 space-x-4 md:space-x-8
     shadow-[0_0_8px_4px_var(--gray-dark)]">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setActive(item.id);
                        switch (item.id) {
                            case "home":
                                navigate("/dashboard");
                                break;
                            case "productos":
                                navigate("/dashboard/products");
                                break;
                            case "crear":
                                navigate("/dashboard/createList");
                                break;
                            case "listas":
                                navigate("/dashboard/lists");
                                break;
                            default:
                                break;
                        }
                    }}
                    className={`relative text-xl font-semibold flex items-center gap-2 px-4 py-2 rounded-full transition-all flex-1 justify-center transform ${
                        active === item.id
                            ? "bg-[var(--primary)] text-[var(--white)] shadow-xl"
                            : "text-[var(--black)] hover:scale-110 hover:shadow-2xl"
                    }`}
                >
                    {/* Ajustar el tamaño de los iconos para pantallas pequeñas y grandes */}
                    {React.cloneElement(item.icon, {
                        size: window.innerWidth <= 640 ? 25 : 35, // 25px en pantallas pequeñas y 35px en pantallas grandes
                    })}

                    {/* Mostrar el label solo en pantallas grandes */}
                    <span className="hidden xl:inline">{item.label}</span>
                </button>
            ))}
        </div>
    );
}
