import ProductCard from "@/components/ProductCard.tsx";
import LoadingProductCard from "@/components/LoadingProductCard.tsx";
import { useToast } from "@/components/Toast.tsx";
import { useCallback, useEffect, useState } from "react";
import { ProductService } from "@services/product.service.js";
import FloatingLabel from "@/components/FloatingLabel.tsx";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { CategoryService } from "@services/category.service.js";
import { SupermarketService } from "@services/supermarket.service.js";
import CreateCategoryModal from "@/components/modals/CreateCategoryModal.js";
import CreateSupermarketModal from "@/components/modals/CreateSupermarketModal.js";

export default function DashboardProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { showToast, ToastComponent } = useToast();
    const [loading, setLoading] = useState(true);

    const showErrorToast = useCallback((message) => {
        showToast(message);
    }, [showToast]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        supermarket: "",
        category: "",
        description: ""
    });

    const [isSupermarketModalOpen, setIsSupermarketModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [supermarkets, setSupermarkets] = useState([]);

    const handleProductClick = useCallback((product) => {
        const matchedCategory = categories.find(c => c.name === product.category);
        const matchedSupermarket = supermarkets.find(s => s.name === product.supermarket);

        setSelectedProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            supermarket: matchedSupermarket?.id?.toString() || "",
            category: matchedCategory?.id?.toString() || "",
            description: product.description,
        });

        console.log("Producto seleccionado:", product);

        showToast(`Producto seleccionado: ${product.name}`, 3000);
    }, [showToast, categories, supermarkets]);



    const handleCreateProduct = async () => {
        try {
            const newProduct = await ProductService.createProduct(formData);
            setProducts(prev => [...prev, newProduct]);
            showToast("Producto creado con éxito", 3000);
            setFormData({ name: "", price: "", supermarket: "", category: "", description: "" });
        } catch (error) {
            console.error("Error creando producto:", error);
            showErrorToast("Error al crear producto");
        }
    };

    const handleUpdateProduct = async () => {
        try {
            await ProductService.updateProduct(selectedProduct.id, formData);
            setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...formData } : p));

            const updatedProducts = await ProductService.getUserProducts();
            setProducts(updatedProducts);

            showToast("Producto actualizado con éxito", 3000);
            setFormData({ name: "", price: "", supermarket: "", category: "", description: "" });
            setSelectedProduct(null);
        } catch (error) {
            console.error("Error actualizando producto:", error);
            showErrorToast("Error al actualizar producto");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleDeleteProduct = useCallback(async (productId) => {
        try {
            await ProductService.deleteProduct(productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
            setSelectedProduct(null);

            showToast("Producto eliminado correctamente", 3000);
        } catch (error) {
            console.error("Error deleting product:", error);
            showErrorToast("Error al eliminar el producto");
        }
    }, [showToast, showErrorToast]);

    const fetchCategories = async () => {
        try {
            const categoriesData = await CategoryService.getUserCategory();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCategoryCreated = useCallback(() => {
        showToast("Categoría creada con éxito", 3000);
        fetchCategories();
    }, [showToast]);

    const handleCategoryUpdated = useCallback(() => {
        showToast("Categoría actualizada correctamente", 3000);
        fetchCategories();
    }, [showToast]);

    const handleCategoryDeleted = useCallback(() => {
        showToast("Categoría eliminada correctamente", 3000);
        fetchCategories();
    }, [showToast]);


    const handleSupermarketUpdated = useCallback(() => {
        showToast(`Supermercado actualizada correctamente`, 3000);
    }, [showToast]);

    const handleSupermarketDeleted = useCallback(() => {
        showToast(`Supermercado eliminada correctamente`, 3000);
    }, [showToast]);

    const handleSupermarketCreated = useCallback(() => {
        showToast(`Supermercado creado con éxito`, 3000);
        fetchSupermarkets();
    }, [showToast]);

    const fetchSupermarkets = async () => {
        try {
            const supermarketsData = await SupermarketService.getUserSupermarkets();
            setSupermarkets(supermarketsData);
        } catch (error) {
            console.error("Error fetching supermarkets:", error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const [categoriesData, supermarketsData] = await Promise.all([
                    CategoryService.getUserCategory(),
                    SupermarketService.getUserSupermarkets()
                ]);

                if (isMounted) {
                    setCategories(categoriesData);
                    setSupermarkets(supermarketsData);
                }
            } catch (error) {
                console.error("Error al cargar categorías o supermercados", error);
            }
            try {
                const productsData = await ProductService.getUserProducts();
                if (isMounted) {
                    setProducts(productsData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (isMounted) {
                    showToast("Error: Could not load your data");
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [showToast]);

    return (
        <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6">
                <div className="order-1 md:order-2">
                    <h2 className="text-[var(--white)] font-semibold text-2xl mb-4">Crear producto</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingLabel labelBgColor="var(--gray-dark)" label="Nombre" name="name" value={formData.name} onChange={handleInputChange} />
                        <FloatingLabel isNumber labelBgColor="var(--gray-dark)" label="Precio (€)" name="price" value={formData.price} onChange={handleInputChange} />
                        <FloatingLabel
                            label="Categoría"
                            name="category"
                            isSelect
                            value={formData.category}
                            onChange={handleInputChange}
                            options={[
                                { value: "", label: "Selecciona una categoría" },
                                ...categories.map(c => ({ value: c.id.toString(), label: c.name })) // Convertir a string
                            ]}
                        />

                        <FloatingLabel
                            label="Supermercado"
                            name="supermarket"
                            isSelect
                            value={formData.supermarket}
                            onChange={handleInputChange}
                            options={[
                                { value: "", label: "Selecciona un supermercado" },
                                ...supermarkets.map(s => ({ value: s.id.toString(), label: s.name })) // Convertir a string
                            ]}
                        />

                        <div className="col-span-1 sm:col-span-2">
                            <FloatingLabel labelBgColor="var(--gray-dark)" label="Descripción" name="description" value={formData.description} onChange={handleInputChange} isTextarea />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <motion.button
                            className="flex-1 bg-[var(--neutral)] px-4 py-2 rounded-full text-[var(--white)]"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setIsCategoryModalOpen(true)}
                        >
                            Crear Categoría
                        </motion.button>

                        <motion.button
                            className="flex-1 bg-[var(--neutral)] px-4 py-2 rounded-full text-[var(--white)]"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setIsSupermarketModalOpen(true)}
                        >
                            Crear Supermercado
                        </motion.button>
                    </div>

                    {!selectedProduct && (
                        <motion.button
                            className="w-full mt-4 bg-[var(--primary)] font-bold flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[var(--white)]"
                            whileHover={{ scale: 1.05 }}
                            onClick={selectedProduct ? handleUpdateProduct : handleCreateProduct}
                        >
                            <PlusCircle />
                            {selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}
                        </motion.button>
                    )}

                    {selectedProduct && (
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                className="w-full mt-4 bg-[var(--primary)] font-bold flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[var(--white)]"
                                whileHover={{ scale: 1.05 }}
                                onClick={selectedProduct ? handleUpdateProduct : handleCreateProduct}
                            >
                                <PlusCircle />
                                {selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}
                            </motion.button>
                            <motion.button
                                className="w-full mt-4 bg-[var(--primary)] font-bold flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[var(--white)]"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setFormData({ name: "", price: "", supermarket: "", category: "", description: "" });
                                }}
                            >
                                Cancelar edición
                            </motion.button>
                        </div>
                    )}

                </div>

                <div className="order-2 md:order-1 md:mb-0 mb-24">
                    <h2 className="text-[var(--white)] font-semibold text-2xl mb-4">Mis productos</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {loading ? (
                            [...Array(4)].map((_, i) => <LoadingProductCard key={i} />)
                        ) : products.length === 0 ? (
                            <p className="text-center text-[var(--white)]">No tienes productos añadidos</p>
                        ) : (
                            products.map((product) => (
                                <ProductCard key={product.id}
                                             product={product}
                                             onClick={() => handleProductClick(product)}
                                             onDelete={() => handleDeleteProduct(product.id)}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Modals */}
            <CreateCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onCategoryCreated={() => {
                    handleCategoryCreated();
                    setIsCategoryModalOpen(false);
                }}
                onCategoryUpdated={handleCategoryUpdated}
                onCategoryDeleted={handleCategoryDeleted}
                categories={categories}
            />

            <CreateSupermarketModal
                isOpen={isSupermarketModalOpen}
                onClose={() => setIsSupermarketModalOpen(false)}
                onSupermarketCreated={()=> {
                    handleSupermarketCreated();
                    setIsSupermarketModalOpen(false);
                }}
                onSupermarketUpdated={handleSupermarketUpdated}
                onSupermarketDeleted={handleSupermarketDeleted}
                supermarkets={supermarkets}
            />

            <ToastComponent />
        </div>
    );
}