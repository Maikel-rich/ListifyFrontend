import { Product } from "@/models/product.model";
import { useCallback, MouseEvent, useState } from "react";

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onDelete: () => void;
}

export default function ProductCard({ product, onClick, onDelete }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDeleting(true);
        setTimeout(() => onDelete(), 300);
    }, [onDelete]);

    const getSupermarketName = () => {
        if (typeof product.supermarket === 'string') return product.supermarket;
        if (product.supermarket?.name) return product.supermarket.name;
        if (product.supermarketId) return `ID:${product.supermarketId}`;
        return 'Sin supermercado';
    };

    const getCategoryName = () => {
        if (typeof product.category === 'string') return product.category;
        if (product.category?.name) return product.category.name;
        if (product.categoryId) return `ID:${product.categoryId}`;
        return 'Sin categoría';
    };

    return (
        <div
            className={`relative bg-[var(--gray-light)] rounded-xl p-4 w-full shadow-md flex flex-col gap-2 cursor-pointer
            border border-transparent hover:bg-[var(--primary)]
            transition-all duration-300 ease-in-out
            ${isDeleting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Producto: ${product.name}`}
        >
            {/* Badge de supermercado - Fondo negro en hover */}
            <div className="flex justify-between items-start">
                <span className={`bg-[var(--primary)] text-[var(--white)] text-xs font-semibold 
                    px-3 py-1 rounded-full w-fit transition-all duration-300
                    ${isHovered ? '!bg-[var(--white)] !text-[var(--black)]' : ''}`}>
                    {getSupermarketName()}
                </span>

                {/* Botón de eliminar */}
                <button
                    onClick={handleDelete}
                    className={`text-[var(--gray-dark)] hover:text-[var(--danger)] text-sm font-medium px-2 py-1 rounded-md
                    transition-colors duration-300
                    ${isHovered ? '!text-[var(--white)]' : ''}`}
                    aria-label="Eliminar producto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>

            {/* Contenido principal */}
            <div className="flex justify-between items-center mt-1">
                <h2 className={`text-lg font-bold text-[var(--black)] transition-colors duration-300
                    ${isHovered ? '!text-[var(--white)]' : ''}`}>
                    {product.name}
                </h2>
                {/* Precio - Fondo negro en hover */}
                <span className={`text-base font-semibold px-2 py-1 rounded-md transition-all duration-300
                    ${product.price ? 'bg-[var(--primary)] text-[var(--white)]' : 'bg-[var(--gray-light)] text-[var(--gray-dark)]'}
                    ${isHovered ? '!bg-[var(--black)] !text-[var(--white)]' : ''}`}>
                    {product.price ? `${product.price.toFixed(2)}€` : 'N/A'}
                </span>
            </div>

            {product.description && (
                <p className={`text-[var(--gray-dark)] text-sm line-clamp-2 transition-colors duration-300
                    ${isHovered ? '!text-[var(--white)]' : ''}`}>
                    {product.description}
                </p>
            )}

            {/* Categoría */}
            <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-md inline-block transition-all duration-300
                    ${isHovered ? 'bg-[var(--black)] text-[var(--white)]' : 'text-[var(--gray-dark)] bg-[var(--gray-light)]'}`}>
                    {getCategoryName()}
                </span>
            </div>
        </div>
    );
}