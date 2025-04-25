import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingListService } from "@services/shoppingList.service.js";
import { motion } from "framer-motion";
import { Pencil, ArrowLeft } from "lucide-react";

export default function ListDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Bloquea scroll global
        return () => {
            document.body.style.overflow = ""; // Restaura al salir
        };
    }, []);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await ShoppingListService.getListById(id);
                setList(data);
            } catch (error) {
                console.error("Error al obtener la lista:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchList();
    }, [id]);

    if (loading) return <p className="text-[var(--white)]">Cargando lista...</p>;
    if (!list) return <p className="text-[var(--white)]">Lista no encontrada</p>;

    const totalProductos = list.products.length;
    const totalPrecio = list.products.reduce((sum, p) => sum + (p.price ?? 0), 0).toFixed(2);

    return (
        <div className="p-4 md:p-6 text-[var(--white)] h-[480px] flex flex-col">
            <h1 className="text-2xl font-bold mb-6">{list.name}</h1>

            <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
                {/* Lista de productos con scroll interno */}
                <div className="md:w-3/4 w-full flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto pr-2 rounded-xl border border-[var(--neutral)]">
                        <div className="divide-y divide-[var(--neutral)]">
                            {list.products.map((p) => (
                                <div key={p.productId} className="grid grid-cols-3 md:grid-cols-4 px-4 py-3 bg-[var(--gray-dark)] hover:bg-[var(--neutral)] transition-colors">
                                    <span className="truncate">{p.productName}</span>
                                    <span className="text-right md:text-center">{p.amount} uds.</span>
                                    <span className="hidden md:block text-center">{p.supermarket}</span>
                                    <span className="text-right">{p.price?.toFixed(2) ?? "0.00"}€</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resumen */}
                <div className="md:w-1/4 w-full border border-[var(--neutral)] rounded-xl p-6 bg-[var(--gray-dark)] h-fit">
                    <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                    <p className="text-lg mb-2">
                        <span className="block font-medium text-[var(--white)]">Cantidad:</span>
                        {totalProductos} productos
                    </p>
                    <p className="text-lg">
                        <span className="block font-medium text-[var(--white)] mb-1">Total:</span>
                        <span className="text-3xl font-bold">{totalPrecio}€</span>
                    </p>
                </div>
            </div>

            {/* Botones */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--neutral)] text-[var(--white)] py-2 rounded-full text-base font-semibold"
                    whileHover={{ scale: 1.02 }}
                >
                    <ArrowLeft />
                    Volver
                </motion.button>
                <motion.button
                    onClick={() => navigate(`/edit-list/${id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--white)] py-2 rounded-full text-base font-semibold"
                    whileHover={{ scale: 1.02 }}
                >
                    <Pencil />
                    Editar
                </motion.button>
            </div>
        </div>
    );
}
