import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        alert(`Buscando: ${query}`);
    };

    return (
        <motion.div
            className="flex items-center bg-white/10 backdrop-blur-lg p-1.5 rounded-full shadow-lg w-full mx-auto"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
        >
            {/* Input de búsqueda */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar listas o productos..."
                className="flex-1 bg-transparent text-white placeholder-gray-300 px-4 py-2 focus:outline-none text-sm md:text-base"
            />

            {/* Botón de búsqueda */}
            <motion.button
                onClick={handleSearch}
                className="bg-[var(--primary)] text-white rounded-full p-2 md:px-6 md:py-1.5 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Search size={20} />
                <span className="hidden md:inline">Buscar</span>
            </motion.button>
        </motion.div>
    );
}
