import { motion } from "framer-motion";

export default function LoadingListCard() {
    return (
        <motion.div
            className="bg-[var(--gray-light)] rounded-2xl p-5 w-full shadow-lg flex flex-col gap-4"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {/* Título */}
            <motion.div
                className="h-7 w-3/4 bg-[var(--gray-dark)]/20 rounded-full"
                animate={{
                    backgroundColor: [
                        'rgba(0, 0, 0, 0.1)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.1)'
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Productos (3 placeholders) */}
            <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-between items-center h-12 bg-[var(--gray-dark)]/10 rounded-lg px-4 py-2"
                        animate={{
                            backgroundColor: [
                                'rgba(0, 0, 0, 0.1)',
                                'rgba(0, 0, 0, 0.15)',
                                'rgba(0, 0, 0, 0.1)'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    >
                        <div className="flex flex-col gap-1 w-3/4">
                            <div className="h-4 bg-[var(--gray-dark)]/20 rounded-full w-full" />
                            <div className="h-3 bg-[var(--gray-dark)]/20 rounded-full w-1/2" />
                        </div>
                        <div className="h-4 bg-[var(--gray-dark)]/20 rounded-full w-1/4" />
                    </motion.div>
                ))}
            </div>

            {/* Total */}
            <motion.div
                className="mt-2 pt-2 border-t border-[var(--gray-dark)]/20 flex justify-between"
                animate={{
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
                <div className="h-5 w-16 bg-[var(--gray-dark)]/20 rounded-full" />
                <div className="h-5 w-20 bg-[var(--gray-dark)]/20 rounded-full" />
            </motion.div>
        </motion.div>
    );
}