import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { SupermarketService } from "@/services/supermarket.service";
import { motion, AnimatePresence } from "framer-motion";
import FloatingLabel from "@/components/FloatingLabel";
import { XMarkIcon, ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Supermarket } from "@/models/supermarket.model";
import { useToast } from "@/components/Toast";

interface SupermarketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSupermarketCreated: (newSupermarket: Supermarket) => void;
    onSupermarketUpdated: (updatedSupermarket: Supermarket) => void;
    onSupermarketDeleted: (deletedSupermarketId: number) => void;
}

export default function SupermarketModal({
                                             isOpen,
                                             onClose,
                                             onSupermarketCreated,
                                             onSupermarketUpdated,
                                             onSupermarketDeleted,
                                         }: SupermarketModalProps) {
    const { showToast } = useToast();
    const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
    const [selectedSupermarket, setSelectedSupermarket] = useState<Supermarket | null>(null);
    const [supermarketName, setSupermarketName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadSupermarkets();
        }
    }, [isOpen]);

    const loadSupermarkets = async () => {
        setIsLoading(true);
        try {
            const userSupermarkets = await SupermarketService.getUserSupermarkets();
            setSupermarkets(userSupermarkets);
        } catch (error) {
            console.error("Error loading supermarkets:", error);
            showToast("Error al cargar los supermercados", 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSupermarketSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const supermarketId = parseInt(e.target.value);
        if (supermarketId) {
            const supermarket = supermarkets.find(s => s.id === supermarketId);
            if (supermarket) {
                setSelectedSupermarket(supermarket);
                setSupermarketName(supermarket.name);
            }
        } else {
            resetSelection();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSupermarketName(e.target.value);
    };

    const resetSelection = () => {
        setSelectedSupermarket(null);
        setSupermarketName("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!supermarketName.trim()) {
            setError("El nombre del supermercado es requerido");
            return;
        }

        setIsSubmitting(true);

        try {
            if (selectedSupermarket) {
                const updatedSupermarket = await SupermarketService.updateSupermarket(
                    selectedSupermarket.id,
                    { name: supermarketName.trim() }
                );
                onSupermarketUpdated(updatedSupermarket);
                showToast(`Supermercado "${updatedSupermarket.name}" actualizado`, 3000);
            } else {
                const newSupermarket = await SupermarketService.createSupermarket({
                    name: supermarketName.trim(),
                });
                onSupermarketCreated(newSupermarket);
                showToast(`Supermercado "${newSupermarket.name}" creado`, 3000);
            }

            resetSelection();
            await loadSupermarkets();
        } catch (err) {
            console.error("Error saving supermarket:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al guardar el supermercado"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedSupermarket) return;

        const confirmDelete = window.confirm(
            `¿Estás seguro de que quieres eliminar el supermercado "${selectedSupermarket.name}"? Esta acción no se puede deshacer.`
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        setError(null);

        try {
            await SupermarketService.deleteSupermarket(selectedSupermarket.id);
            onSupermarketDeleted(selectedSupermarket.id);
            showToast(`Supermercado "${selectedSupermarket.name}" eliminado correctamente`, 3000);
            resetSelection();
            await loadSupermarkets();
        } catch (err) {
            console.error("Error deleting supermarket:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al eliminar el supermercado"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative bg-[var(--gray-dark)] rounded-xl p-6 w-full max-w-md border border-[var(--gray-light)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[var(--gray-light)] hover:text-[var(--primary)] transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-[var(--white)] mb-6">
                            {selectedSupermarket ? "Editar Supermercado" : "Crear Nuevo Supermercado"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <FloatingLabel
                                    label="Seleccionar supermercado"
                                    name="supermarketSelect"
                                    isSelect
                                    options={[
                                        { value: "", label: "Crear nuevo supermercado" },
                                        ...supermarkets.map(s => ({ value: s.id.toString(), label: s.name }))
                                    ]}
                                    value={selectedSupermarket?.id?.toString() || ""}
                                    labelBgColor="var(--gray-dark)"
                                    disabled={isLoading}
                                    onChange={handleSupermarketSelect}
                                />

                                {isLoading && (
                                    <p className="text-sm text-[var(--gray-light)]">Cargando supermercados...</p>
                                )}

                                {selectedSupermarket && (
                                    <div className="flex justify-between items-center bg-[var(--gray-medium)] p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[var(--white)]">Editando:</span>
                                            <span className="font-medium text-[var(--primary)]">{selectedSupermarket.name}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={resetSelection}
                                                className="flex items-center gap-1 text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
                                            >
                                                <ArrowPathIcon className="h-4 w-4" />
                                                Cambiar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDelete}
                                                className="flex items-center gap-1 text-sm text-[var(--danger)] hover:text-[var(--danger-dark)] transition-colors"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? (
                                                    <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    <TrashIcon className="h-4 w-4" />
                                                )}
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <FloatingLabel
                                    label="Nombre del supermercado"
                                    name="supermarketName"
                                    value={supermarketName}
                                    labelBgColor="var(--gray-dark)"
                                    disabled={isSubmitting || isDeleting}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-3 bg-[var(--danger)]/20 text-[var(--danger)] rounded-lg text-sm border border-[var(--danger)]"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-full text-[var(--white)] bg-[var(--neutral)] hover:bg-[var(--gray-light)] hover:text-[var(--black)] transition-colors disabled:opacity-50"
                                    disabled={isSubmitting || isDeleting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-full text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
                                    disabled={isSubmitting || isDeleting || !supermarketName.trim()}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                            {selectedSupermarket ? "Guardando..." : "Creando..."}
                                        </>
                                    ) : (
                                        selectedSupermarket ? "Guardar Cambios" : "Crear Supermercado"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
