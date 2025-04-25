import { useCallback, useEffect, useState } from "react";
import { getListsByUser } from "@/services/list.service";
import ProductCard from "../../components/ProductCard";
import { useToast } from "@/components/Toast";
import { ProductService } from "@/services/product.service";
import { jwtDecode } from 'jwt-decode';
import LoadingProductCard from "@/components/LoadingProductCard.js";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
    const [username, setUsername] = useState('Usuario');
    const [lists, setLists] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({
        lists: true,
        products: true
    });
    const navigate = useNavigate();

    const { showToast, ToastComponent } = useToast();

    const showErrorToast = useCallback((message) => {
        showToast(message);
    }, [showToast]);

    useEffect(() => {
        let isMounted = true;

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded.username); // Ajusta según la estructura de tu token
        }

        const fetchData = async () => {
            try {
                // Fetch lists
                const listsData = await getListsByUser();
                if (isMounted) setLists(listsData);

                // Fetch products
                const productsData = await ProductService.getUserProducts();
                if (isMounted) {
                    setProducts(productsData);
                    setLoading(prev => ({ ...prev, products: false }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (isMounted) {
                    setError("Failed to load your data");
                    showErrorToast("Error: Could not load your data");
                }
            } finally {
                if (isMounted) setLoading(prev => ({ ...prev, lists: false }));
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [showErrorToast]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleListClick = useCallback((list) => {
        navigate(`/dashboard/details/${list.id}`);
        showToast(`Lista seleccionada: ${list.name}`, 3000);
    }, [showToast]);

    const handleProductClick = useCallback((product) => {
        showToast(`Producto seleccionado: ${product.name}`, 3000);
    }, [showToast]);

    const handleDeleteProduct = useCallback(async (productId) => {
        try {
            await ProductService.deleteProduct(productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
            showToast("Producto eliminado correctamente", 3000);
        } catch (error) {
            console.error("Error deleting product:", error);
            showErrorToast("Error al eliminar el producto");
        }
    }, [showToast, showErrorToast]);

    return (
        <div className="px-4 pb-4 md:p-6">
            <h1 className="text-3xl text-[var(--white)] mb-6">
                Bienvenido, <b>{username}</b>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-[var(--white)] font-semibold text-2xl mb-4">Mis listas</h2>
                    <div className="bg-[var(--gray-light)] rounded-xl shadow-md p-4 h-auto md:max-h-[320px] overflow-y-auto scrollbar-hide">
                        {loading.lists ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-16 w-full rounded-lg bg-[var(--gray-dark)]/20" />
                                ))}
                            </div>
                        ) : error ? (
                            <p className="text-[var(--white)] text-center py-8">{error}</p>
                        ) : lists.length === 0 ? (
                            <p className="text-[var(--black)] font-bold text-center py-8">No tienes listas creadas</p>
                        ) : (
                            <ul className="space-y-3">
                                {lists.map((list) => (
                                    <li
                                        key={list.id}
                                        className="group grid grid-cols-[1fr_90px] md:grid-cols-[1fr_100px] items-center
                                        gap-4 sm:p-3 p-1 rounded-lg bg-[var(--gray-light)] hover:bg-[var(--primary)]
                                        transition-colors cursor-pointer"
                                        onClick={() => handleListClick(list)}
                                    >
                                        <div className="text-[var(--gray-dark)] group-hover:text-[var(--white)]">
                                            <h3 className="font-semibold text-xl truncate">
                                                {list.name}
                                            </h3>
                                        </div>
                                        <span className="text-md text-right text-[var(--gray-dark)]
                                        group-hover:text-[var(--white)]"
                                        >
                                            {formatDate(list.updatedAt)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="mb-24 md:mb-0">
                    <h2 className="text-[var(--white)] font-semibold text-2xl mb-4">Últimos productos</h2>
                    <div className="space-y-4 h-auto md:max-h-[320px] overflow-x-hidden overflow-y-auto pr-2">
                        {loading.products ? (
                            [...Array(4)].map((_, i) => <LoadingProductCard key={i} />)
                        ) : products.length === 0 ? (
                            <p className="text-[var(--white)] mt-4 font-bold text-center py-8">No tienes productos añadidos</p>
                        ) : (
                            Array.isArray(products) &&
                            products.slice(0, 4).map((product) => {
                                if (!product || !product.id) return null;

                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={() => handleProductClick(product)}
                                        onDelete={() => handleDeleteProduct(product.id)}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <ToastComponent />
        </div>
    );
}