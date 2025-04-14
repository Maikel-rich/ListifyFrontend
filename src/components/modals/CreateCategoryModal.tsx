import { useState, useEffect, FormEvent, ChangeEvent, useCallback } from "react";
import { CategoryService } from "@/services/category.service";
import { motion, AnimatePresence } from "framer-motion";
import FloatingLabel from "@/components/FloatingLabel";
import { XMarkIcon, ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Category } from "@/models/category.model";
import { useToast } from "@/components/Toast";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCategoryCreated: (newCategory: Category) => void;
    onCategoryUpdated: (updatedCategory: Category) => void;
    onCategoryDeleted: (deletedCategoryId: number) => void;
}

export default function CategoryModal({
                                          isOpen,
                                          onClose,
                                          onCategoryCreated,
                                          onCategoryUpdated,
                                          onCategoryDeleted,
                                      }: CategoryModalProps) {
    const { showToast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = useCallback(() => {
        setSelectedCategory(null);
        setCategoryName("");
        setError(null);
    }, []);

    const loadCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const userCategories = await CategoryService.getUserCategory();
            setCategories(userCategories);
        } catch (error) {
            console.error("Error loading categories:", error);
            showToast("Error al cargar las categorías", 3000);
            setError("Error al cargar las categorías");
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        if (isOpen) {
            loadCategories();
            resetForm();
        }
    }, [isOpen, loadCategories, resetForm]);

    const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find(c => c.id === categoryId);

        if (category) {
            setSelectedCategory(category);
            setCategoryName(category.name);
        } else {
            resetForm();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
        if (error) setError(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError("El nombre de la categoría es requerido");
            return;
        }

        if (categoryName.trim().length > 50) {
            setError("El nombre no puede exceder los 50 caracteres");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (selectedCategory) {
                const updatedCategory = await CategoryService.updateCategory(
                    selectedCategory.id,
                    { name: categoryName.trim() }
                );
                onCategoryUpdated(updatedCategory);
                showToast(`Categoría "${updatedCategory.name}" actualizada`, 3000);
            } else {
                const newCategory = await CategoryService.createCategory({
                    name: categoryName.trim(),
                });
                onCategoryCreated(newCategory);
                showToast(`Categoría "${newCategory.name}" creada`, 3000);
            }

            resetForm();
            await loadCategories();
        } catch (err) {
            console.error("Error saving category:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al guardar la categoría"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;

        const confirmDelete = window.confirm(
            `¿Estás seguro de que quieres eliminar la categoría "${selectedCategory.name}"? Esta acción no se puede deshacer.`
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        setError(null);

        try {
            await CategoryService.deleteCategory(selectedCategory.id);
            onCategoryDeleted(selectedCategory.id);
            showToast(`Categoría "${selectedCategory.name}" eliminada`, 3000);
            resetForm();
            await loadCategories();
        } catch (err) {
            console.error("Error deleting category:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al eliminar la categoría"
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
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="absolute top-4 right-4 text-[var(--gray-light)] hover:text-[var(--primary)] transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-[var(--white)] mb-6">
                            {selectedCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <FloatingLabel
                                    label="Seleccionar categoría"
                                    name="categorySelect"
                                    isSelect
                                    options={[
                                        { value: "", label: "Crear nueva categoría" },
                                        ...categories.map(c => ({ value: c.id.toString(), label: c.name }))
                                    ]}
                                    value={selectedCategory?.id?.toString() || ""}
                                    onChange={handleCategorySelect}
                                    labelBgColor="var(--gray-dark)"
                                    disabled={isLoading || isSubmitting || isDeleting}
                                />

                                {isLoading && (
                                    <p className="text-sm text-[var(--gray-light)]">Cargando categorías...</p>
                                )}

                                {selectedCategory && (
                                    <div className="flex justify-between items-center bg-[var(--gray-medium)] p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[var(--white)]">Editando:</span>
                                            <span className="font-medium text-[var(--primary)]">{selectedCategory.name}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="flex items-center gap-1 text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
                                                disabled={isSubmitting || isDeleting}
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
                                    label="Nombre de la categoría"
                                    name="categoryName"
                                    value={categoryName}
                                    onChange={handleInputChange}
                                    labelBgColor="var(--gray-dark)"
                                    disabled={isSubmitting || isDeleting}
                                    maxLength={50}
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
                                    onClick={() => {
                                        resetForm();
                                        onClose();
                                    }}
                                    className="px-4 py-2 rounded-full text-[var(--white)] bg-[var(--neutral)] hover:bg-[var(--gray-light)] hover:text-[var(--black)] transition-colors disabled:opacity-50"
                                    disabled={isSubmitting || isDeleting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-full text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
                                    disabled={isSubmitting || isDeleting || !categoryName.trim()}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                            {selectedCategory ? "Guardando..." : "Creando..."}
                                        </>
                                    ) : (
                                        selectedCategory ? "Guardar Cambios" : "Crear Categoría"
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