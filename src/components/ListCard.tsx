    import { Product } from "@/models/product.model";

    interface ListCardProps {
        name: string;
        products?: Product[];
        onClick?: () => void;
    }

    export default function ListCard({ name, products, onClick }: ListCardProps) {
        const safeProducts = Array.isArray(products) ? products : [];

        const totalPrice = safeProducts.reduce((sum, product) => {
            const amount = product.amount ?? 1;
            const price = product.price ?? 0;
            return sum + price * amount;
        }, 0);

        return (
            <div
                className="group bg-[var(--gray-light)] rounded-2xl p-5 w-full shadow-lg flex flex-col gap-4 h-[370px]
                cursor-pointer border-2 border-transparent transition-all duration-200
                hover:bg-[var(--primary)]"
                onClick={onClick}
            >
                {/* Título - Cambia a blanco en hover */}
                <h2 className="text-xl font-bold truncate text-[var(--black)]
                    group-hover:text-[var(--white)]">
                    {name}
                </h2>

                {/* Lista de productos */}
                <div className="flex flex-col gap-2">
                    {safeProducts.slice(0, 3).map((product) => {
                        const amount = product.amount ?? 1;
                        return (
                            <div
                                key={product.id}
                                className="flex justify-between items-center text-sm bg-[var(--neutral)] rounded-lg px-4 py-2
                                group-hover:bg-[var(--white)] group-hover:text-[var(--black)]"
                            >
                                <div className="flex flex-col">
                                    <span className="truncate font-medium text-[var(--white)]
                                        group-hover:text-[var(--black)]">
                                        {product.name}
                                    </span>
                                    <span className="text-xs text-[var(--gray-light)]
                                        group-hover:text-[var(--gray-dark)]">
                                        {amount} {amount === 1 ? 'ud' : 'uds'}
                                    </span>
                                </div>
                                <span className="text-sm text-[var(--white)] opacity-90
                                    group-hover:text-[var(--black)] group-hover:opacity-100">
                                    {product.price ? `${(product.price * amount).toFixed(2)}€` : "N/A"}
                                </span>
                            </div>
                        );
                    })}

                    {safeProducts.length === 0 && (
                        <p className="text-sm text-[var(--gray-dark)] italic
                            group-hover:text-[var(--white)]">
                            Sin productos en la lista
                        </p>
                    )}
                </div>

                {/* Total - Cambia a blanco en hover */}
                {safeProducts.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[var(--neutral)] flex justify-between text-lg font-semibold
                        text-[var(--black)] group-hover:text-[var(--white)]
                        group-hover:border-[var(--white)]">
                        <span>Total</span>
                        <span>{totalPrice.toFixed(2)}€</span>
                    </div>
                )}
            </div>
        );
    }