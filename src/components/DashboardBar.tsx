import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Package, PlusCircle, List } from "lucide-react";

export default function DashboardBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("");

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/dashboard/products")) {
            setActive("productos");
        } else if (path.includes("/dashboard/createList")) {
            setActive("crear");
        } else if (path.includes("/dashboard/lists")) {
            setActive("listas");
        } else {
            setActive("home");
        }
    }, [location.pathname]);

    const navItems = [
        { id: "home", label: "Inicio", path: "/dashboard", icon: <Home size={30} /> },
        { id: "productos", label: "Productos", path: "/dashboard/products", icon: <Package size={30} /> },
        { id: "crear", label: "Crear", path: "/dashboard/createList", icon: <PlusCircle size={30} /> },
        { id: "listas", label: "Mis listas", path: "/dashboard/lists", icon: <List size={30} /> },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[50%] flex bg-[var(--gray-light)] h-[70px] rounded-full p-2 z-10 space-x-4 md:space-x-8 shadow-[0_0_8px_4px_var(--gray-dark)]">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        if (location.pathname !== item.path) {
                            navigate(item.path);
                        }
                    }}
                    className={`relative text-xl font-semibold flex items-center gap-2 px-1 sm:px-4 py-2 rounded-full transition-all flex-1 justify-center transform ${
                        active === item.id
                            ? "bg-[var(--primary)] text-[var(--white)] shadow-xl"
                            : "text-[var(--black)] hover:scale-110 hover:shadow-2xl"
                    }`}
                >
                    {item.icon}
                    <span className="hidden xl:inline">{item.label}</span>
                </button>
            ))}
        </div>
    );
}
