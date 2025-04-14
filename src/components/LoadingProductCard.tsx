import { motion } from "framer-motion";
import { useCallback, MouseEvent, useState } from "react";

export default function LoadingProductCard() {
    const [isDeleting] = useState(false); // Para mantener consistencia con ProductCard

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // No hacer nada en el loader
    }, []);

    return (
        <motion.div
            className="relative bg-[var(--gray-light)] rounded-xl p-4 w-full shadow-md flex flex-col gap-2
            border border-transparent transition-all duration-300 ease-in-out"
            aria-label="Cargando producto"
            initial={{ opacity: 1 }}
            animate={{
                opacity: [0.9, 1, 0.9],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Encabezado con badge y botón */}
            <div className="flex justify-between items-start">
                {/* Badge de supermercado (loader) */}
                <motion.span
                    className="bg-[var(--primary)] text-transparent text-xs font-semibold
                    px-3 py-1 rounded-full w-24 transition-all duration-300"
                    animate={{
                        backgroundColor: [
                            'var(--primary)',
                            'var(--primary-dark)',
                            'var(--primary)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}
                >
                    Cargando...
                </motion.span>

                {/* Botón de eliminar (placeholder) */}
                <button
                    onClick={handleDelete}
                    className="text-transparent text-sm font-medium px-2 py-1 rounded-md"
                    aria-hidden="true"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>

            {/* Contenido principal (loaders) */}
            <div className="flex justify-between items-center mt-1">
                <motion.h2
                    className="text-lg font-bold text-transparent bg-[var(--gray-dark)]/20 rounded w-3/4 h-6"
                    animate={{
                        opacity: [0.6, 0.9, 0.6],
                        width: ['75%', '85%', '75%']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.3
                    }}
                >
                    &nbsp;
                </motion.h2>

                <motion.span
                    className="text-base font-semibold px-2 py-1 rounded-md transition-all duration-300
                    bg-[var(--primary)] text-transparent"
                    animate={{
                        backgroundColor: [
                            'var(--primary)',
                            'var(--primary-dark)',
                            'var(--primary)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6
                    }}
                >
                    00.00€
                </motion.span>
            </div>

            {/* Descripción (loader) */}
            <motion.p
                className="text-transparent bg-[var(--gray-dark)]/20 text-sm line-clamp-2 rounded h-4"
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                    width: ['100%', '95%', '100%']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.9
                }}
            >
                &nbsp;
            </motion.p>

            {/* Categoría (loader) */}
            <div className="mt-2">
                <motion.span
                    className="text-xs px-2 py-1 rounded-md inline-block transition-all duration-300"
                    animate={{
                        backgroundColor: [
                            'var(--gray-light)',
                            'var(--gray-medium)',
                            'var(--gray-light)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.2
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </motion.span>
            </div>
        </motion.div>
    );
}