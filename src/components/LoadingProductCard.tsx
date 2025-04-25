import { motion } from "framer-motion";

export default function LoadingProductCard() {
    return (
        <motion.div
            className="relative bg-[var(--gray-light)] rounded-xl p-4 w-full shadow-md text-[var(--black)]
                border border-transparent transition-all duration-300 ease-in-out"
            aria-label="Cargando producto"
            initial={{ opacity: 1 }}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Top: supermercado + delete */}
            <div className="flex justify-between items-start mb-1">
                <motion.span
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--primary)] text-transparent w-24"
                    animate={{
                        backgroundColor: [
                            'var(--primary)',
                            'var(--primary-hover)',
                            'var(--primary)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Cargando...
                </motion.span>

                <button
                    className="p-1 rounded-md text-transparent"
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

            {/* Nombre + Precio */}
            <div className="flex justify-between items-center">
                <motion.h2
                    className="text-lg font-bold bg-[var(--gray-dark)]/20 text-transparent rounded w-3/4 h-6"
                    animate={{
                        opacity: [0.6, 0.9, 0.6],
                        width: ['75%', '85%', '75%']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                    &nbsp;
                </motion.h2>
                <motion.span
                    className="text-sm font-semibold px-2 py-1 rounded-md bg-[var(--primary)] text-transparent"
                    animate={{
                        backgroundColor: [
                            'var(--primary)',
                            'var(--primary-hover)',
                            'var(--primary)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                    00.00€
                </motion.span>
            </div>

            {/* Descripción */}
            <motion.p
                className="text-sm mt-1 line-clamp-2 bg-[var(--gray-dark)]/20 text-transparent rounded h-4"
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                    width: ['100%', '95%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            >
                &nbsp;
            </motion.p>

            {/* Categoría */}
            <div className="mt-2">
                <motion.span
                    className="text-xs px-2 py-1 rounded-md inline-block bg-[var(--gray-dark)] text-transparent w-20"
                    animate={{
                        backgroundColor: [
                            'var(--gray-light)',
                            'var(--gray-dark)',
                            'var(--gray-light)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                >
                    &nbsp;
                </motion.span>
            </div>
        </motion.div>
    );
}
