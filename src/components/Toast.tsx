import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Toast {
    message: string;
    id: number;
}

export const useToast = () => {
    const [toast, setToast] = useState<Toast | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const toastIdRef = useRef(0);

    const showToast = useCallback((message: string, duration = 3000) => {
        console.log('[Toast] showToast called with:', message);

        // Cancel any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const newId = ++toastIdRef.current;
        setToast({ message, id: newId });

        timeoutRef.current = setTimeout(() => {
            console.log('[Toast] Auto-dismissing toast ID:', newId);
            setToast(current => current?.id === newId ? null : current);
            timeoutRef.current = null;
        }, duration);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const dismissToast = useCallback(() => {
        console.log('[Toast] Manual dismiss');
        setToast(null);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const ToastComponent = useCallback(() => {
        console.log('[Toast] Render - Current toast:', toast?.id);

        if (!toast) return null;

        return (
            <motion.div
                key={`toast-${toast.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-5 right-5 bg-[var(--primary)] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
            >
                <span>{toast.message}</span>
                <button
                    onClick={dismissToast}
                    aria-label="Cerrar notificación"
                    className="focus:outline-none"
                >
                    <X className="w-5 h-5 text-gray-300 hover:text-white" />
                </button>
            </motion.div>
        );
    }, [toast, dismissToast]);

    return { showToast, ToastComponent };
};